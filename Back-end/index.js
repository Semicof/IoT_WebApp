const express = require("express");
const cors = require("cors");
const parser = require("body-parser");
const mysql = require("mysql2");
const mqtt = require("mqtt");
const WebSocket = require("ws");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.DBPASS,
  database: "iot",
});

const brokerURL = "mqtt://192.168.2.9:1886";
const options = {
  clientId: "semicof-client",
  username: "semicof",
  password: "2002",
};

const client = mqtt.connect(brokerURL, options);

client.on("connect", () => {
  console.log("Connected to broker!");

  client.subscribe("sensor_data", (err) => {
    if (err) console.log("Subscribe error: " + err);
    else console.log("Topic ok!");
  });
});

client.on("reconnect", () => {
  console.log("Reconnecting...");
});

client.on("error", (err) => {
  console.error("Error:", err);
});

function handleDevice(msg, device) {
  console.log(msg + "1");
  client.publish(`device/${device}`, msg, (err) => {
    if (err) {
      console.log("Publish error: " + err);
    } else console.log(msg);
  });
}

app.get("/api/v1/device_control", (req, res) => {
  const device = req.query.device;
  const msg = req.query.state;
  res.send("Device: " + device + " Message: " + msg);
  const queryString = "INSERT INTO action_history (device,action) VALUES (?,?)";
  db.query(queryString, [device, msg == "1" ? "on" : "off"], (err) => {
    if (err) console.log(err);
  });
  handleDevice(msg, device);
});

app.get("/api/v1/get_all", (req, res) => {
  const query = "SELECT * FROM sensor_data";
  db.query(query, (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});

const recordsPerPage = 10;

app.get("/api/v1/sensor_data", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const offset = (page - 1) * recordsPerPage;
  const sortColumn = req.query.sort || "id";
  const sortOrder = req.query.order || "ASC";
  const searchTerm = req.query.searchTerm || "";

  const query = `SELECT * FROM sensor_data
                WHERE time LIKE "%${searchTerm}%"
                ORDER BY ${sortColumn} ${sortOrder}
                LIMIT ${recordsPerPage} OFFSET ${offset}`;

  db.query(query, (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});

app.get("/api/v1/action_history", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const offset = (page - 1) * recordsPerPage;
  const sortColumn = req.query.sort || "id";
  const sortOrder = req.query.order || "ASC";
  const searchTerm = req.query.searchTerm || "";

  const query = `SELECT * FROM action_history
                WHERE time LIKE "%${searchTerm}%"
                ORDER BY ${sortColumn} ${sortOrder}
                LIMIT ${recordsPerPage} OFFSET ${offset}`;

  db.query(query, (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});


const PORT = 4000 || process.env.PORT;

const server = app.listen(PORT, () => console.log(`App start on ${PORT}`));
const wss = new WebSocket.Server({ noServer: true });

const handleSensorData = (message, ws) => {
  const [temperature, humidity, brightness] = message.toString().split(",");
  console.log("Sensor data message: " + message.toString());

  const queryString =
    "INSERT INTO sensor_data (temperature, humidity, brightness) VALUES (?, ?, ?)";
  db.query(queryString, [temperature, humidity, brightness], (err, result) => {
    if (err) {
      console.error("Error saving sensor data to the database:", err);
      return;
    }
    console.log("Sensor data saved to the database");

  });
  ws.send(JSON.stringify({ temperature, humidity, brightness }));
};

wss.on("connection", (ws) => {
  console.log("WebSocket client connected");

  ws.on("close", () => {
    console.log("WebSocket client disconnected");
  });
});

client.on("message", (topic, message) => {
  wss.clients.forEach((ws) => {
    handleSensorData(message, ws);
  });
});

server.on("upgrade", (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit("connection", ws, request);
  });
});
