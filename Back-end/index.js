const express = require("express");
const cors = require("cors");
const parser = require("body-parser");
const mysql = require("mysql2");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "2002",
  database: "iot",
});

const recordsPerPage = 8;

app.get("/api/sensor_data", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const offset = (page - 1) * recordsPerPage;
  const sortColumn = req.query.sort || "id";
  const sortOrder = req.query.order || "ASC";
  const searchTerm = req.query.searchTerm || "";

  const query = `SELECT * FROM sensor_data
                WHERE id LIKE "%${searchTerm}%"
                ORDER BY ${sortColumn} ${sortOrder}
                LIMIT ${recordsPerPage} OFFSET ${offset}`;

  db.query(query, (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});

app.get("/api/action_history", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const offset = (page - 1) * recordsPerPage;
  const sortColumn = req.query.sort || "id";
  const sortOrder = req.query.order || "ASC";
  const searchTerm = req.query.searchTerm || "";

  const query = `SELECT * FROM action_history
                WHERE device LIKE "%${searchTerm}%" OR action LIKE "%${searchTerm}%"
                ORDER BY ${sortColumn} ${sortOrder}
                LIMIT ${recordsPerPage} OFFSET ${offset}`;

  db.query(query, (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});

const PORT = 4000 || process.env.PORT;

app.listen(PORT, () => console.log(`App start on ${PORT}`));
