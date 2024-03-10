import React, { useState, useEffect } from "react";
import { useDeviceContext } from "./context/DeviceContext";
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

  const {lightState,fanState,setDeviceState} = useDeviceContext();

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/v1/get_all");
      const newData = response.data.map((dataObj) => ({
        temperatureData: dataObj.temperature,
        humidityData: dataObj.humidity,
        brightnessData: dataObj.brightness,
        date: dataObj.time,
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
      const data = JSON.parse(event.data);

      if (data.temperature !== undefined) {
        const { temperature, humidity, brightness } = data;
        setSensorData({ temperature, humidity, brightness });
      } else if (data.light_data !== undefined) {
        const lightStatus = data.light_data;
        setDeviceState("light",lightStatus === "1" ? "On" : "Off");
      } else if (data.fan_data !== undefined) {
        const fanStatus = data.fan_data;
        setDeviceState("fan",fanStatus === "1" ? "On" : "Off"); 
      }
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      socket.close();
    };
  }, []);

  const handleDevices = async (deviceName,deviceState) => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/device_control",
        {
          params: {
            device: deviceName,
            state: deviceState,
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.error("Error making API call:", error);
    }
  };

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
          <Button onClick={()=>handleDevices("fan",fanState==="On"?"0":"1")} name={"Fan"} state={fanState} />
          <Button onClick={()=>handleDevices("light",lightState==="On"?"0":"1")} name={"Light"} state={lightState} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
