import React, { createContext, useState,useEffect, useContext } from 'react';

const DeviceContext = createContext();

export const DeviceProvider = ({ children }) => {
  const [lightState, setLightState] = useState("Off");
  const [fanState, setFanState] = useState("Off");
  const [sensorData, setSensorData] = useState({
    temperature: 0,
    humidity: 0,
    brightness: 0,
  });

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

  const setDeviceState = (device, state) => {
    if (device === 'light') {
      setLightState(state);
    } else if (device === 'fan') {
      setFanState(state);
    }
  };

  return (
    <DeviceContext.Provider value={{ lightState, fanState,sensorData, setDeviceState }}>
      {children}
    </DeviceContext.Provider>
  );
};

export const useDeviceContext = () => {
  return useContext(DeviceContext);
};
