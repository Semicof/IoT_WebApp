import React from 'react';
import { NavLink } from 'react-router-dom';
import "./styles/Navbar.css"

function Navbar() {
  return (
    <div className='navbar'>
      <NavLink exact to={"/"} className='linkPage' >DASHBOARD</NavLink>
      <NavLink to={"/sensor_data"} className='linkPage' >SENSOR DATA</NavLink>
      <NavLink to={"/action_history"} className='linkPage' >ACTION HISTORY</NavLink>
      <NavLink to={"/profile"} className='linkPage' >PROFILE</NavLink>
    </div>
  )
}

export default Navbar;
