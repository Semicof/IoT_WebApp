import React, { useState, useEffect } from "react";
import "./styles/Dashboard.css";
import Button from "./components/dashboardComponents/Button";
import StatusChart from "./components/dashboardComponents/StatusChart";
import Status from "./components/dashboardComponents/Status";
import axios from "axios";

function Dashboard() {
  const [allData, setAllData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://api.weatherapi.com/v1/forecast.json?key=6c96119eb87d4325a7d21001242201&q=93501&days=14"
      );
      const newData = response.data.forecast.forecastday.map((dataObj) => ({
        date: dataObj.date,
        temperatureData: dataObj.day.avgtemp_c,
        humidityData: dataObj.day.avghumidity,
        brightnessData: dataObj.day.uv,
      }));
      setAllData(newData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();

    const intervalId = setInterval(fetchData, 10000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);


  const [sensorData, setSensorData] = useState({
    temperature: randomValue(5, 45),
    humidity: randomValue(30, 80),
    brightness: randomValue(0, 100000),
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSensorData({
        temperature: randomValue(5, 45),
        humidity: randomValue(30, 80),
        brightness: randomValue(0, 100000),
      });
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const [lightState, setLightState] = useState("Off");
  const [fanState, setFanState] = useState("Off");

  function handleLight() {
    lightState === "Off" ? setLightState("On") : setLightState("Off");
  }

  function handleFan() {
    fanState === "Off" ? setFanState("On") : setFanState("Off");
  }

  function randomValue(start, end) {
    return Math.random() * (end - start) + start;
  }

  return (
    <div className="dashboard">
      <div className="statusContainer">
        <Status name={"temperature"} data={sensorData.temperature} />
        <Status name={"humidity"} data={sensorData.humidity} />
        <Status name={"brightness"} data={sensorData.brightness} />
      </div>
      <div className="functionsContainer">
        <StatusChart allData={allData}
        />
        <div className="adjustmentContainer">
          <Button onClick={handleFan} name={"Fan"} state={fanState} />
          <Button onClick={handleLight} name={"Light"} state={lightState} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
