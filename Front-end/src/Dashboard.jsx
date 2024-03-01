import React, { useState, useEffect } from "react";
import "./styles/Dashboard.css";
import Button from "./components/dashboardComponents/Button";
import StatusChart from "./components/dashboardComponents/StatusChart";
import Status from "./components/dashboardComponents/Status";
import axios from "axios";

function Dashboard() {
  const [allData, setAllData] = useState([]);
  const [sensorData, setSensorData] = useState({
    temperature: 0,
    humidity: 0,
    brightness: 0,
  });

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/get_all"
      );
      const newData = response.data.map((dataObj) => ({
        temperatureData: dataObj.temperature,
        humidityData: dataObj.humidity,
        brightnessData: dataObj.brightness,
        date:dataObj.time
      }));
      setAllData(newData);
      console.log(newData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();

    const intervalId = setInterval(fetchData, 5000);

    return () => {
      clearInterval(intervalId);
    }; 
  }, []);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:4000");

    socket.onopen = () => {
      console.log("WebSocket connection established");
    };

    socket.onmessage = (event) => {
      const { temperature, humidity, brightness } = JSON.parse(event.data);
      setSensorData({ temperature, humidity, brightness });
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      socket.close();
    };
  }, []);


  const [lightState, setLightState] = useState("Off");
  const [fanState, setFanState] = useState("Off");

  const handleLight = async () => {
    setLightState((prevState) => (prevState === "Off" ? "On" : "Off"));
  };

  useEffect(() => {
    const makeApiCall = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/device_control",
          {
            params: {
              device: "light",
              state: lightState === "Off" ? "0" : "1",
            },
          }
        );
        console.log(response);
      } catch (error) {
        console.error("Error making API call:", error);
      }
    };

    makeApiCall();
  }, [lightState]);

  const handleFan = async () => {
    setFanState((prevState) => (prevState === "Off" ? "On" : "Off"));
  };

  useEffect(() => {
    const makeApiCall = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/device_control",
          {
            params: {
              device: "fan",
              state: fanState === "Off" ? "0" : "1",
            },
          }
        );
        console.log(response);
      } catch (error) {
        console.error("Error making API call:", error);
      }
    };

    makeApiCall();
  }, [fanState]);

  return (
    <div className="dashboard">
      <div className="statusContainer">
        <Status name={"temperature"} data={sensorData.temperature} />
        <Status name={"humidity"} data={sensorData.humidity} />
        <Status name={"brightness"} data={sensorData.brightness} />
      </div>
      <div className="functionsContainer">
        <StatusChart allData={allData} />
        <div className="adjustmentContainer">
          <Button onClick={handleFan} name={"Fan"} state={fanState} />
          <Button onClick={handleLight} name={"Light"} state={lightState} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
