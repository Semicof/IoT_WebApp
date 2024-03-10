import React from 'react';
import {Routes,Route} from "react-router-dom";
import Dashboard from "./Dashboard.jsx";
import ActionHistory from "./ActionHistory.jsx";
import SensorData from "./SensorData.jsx";
import Profile from "./Profile.jsx";
import Navbar from './Navbar.jsx';
import { DeviceProvider } from './context/DeviceContext.jsx';
import "./styles/App.css";

function App() {
  return (
    <>
    <DeviceProvider>
    <Navbar/>
    <div className='main'>
        <Routes>
            <Route element={<Dashboard/>} path='/'/>
            <Route element={<ActionHistory/>} path='/action_history'/>
            <Route element={<SensorData/>} path='/sensor_data'/>
            <Route element={<Profile/>} path="/profile"/>
        </Routes>
    </div>
    </DeviceProvider>
    </>
  )
}

export default App