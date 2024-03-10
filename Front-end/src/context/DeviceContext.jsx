import React, { createContext, useState, useContext } from 'react';

const DeviceContext = createContext();

export const DeviceProvider = ({ children }) => {
  const [lightState, setLightState] = useState("Off");
  const [fanState, setFanState] = useState("Off");

  const setDeviceState = (device, state) => {
    if (device === 'light') {
      setLightState(state);
    } else if (device === 'fan') {
      setFanState(state);
    }
  };

  return (
    <DeviceContext.Provider value={{ lightState, fanState, setDeviceState }}>
      {children}
    </DeviceContext.Provider>
  );
};

export const useDeviceContext = () => {
  return useContext(DeviceContext);
};
