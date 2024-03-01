import axios from "axios";
import React, { useEffect, useState } from "react";
import PaginationTable from "./components/dataComponents/PaginationTable";
import "./styles/SensorData.css"

function SensorData() {
  return (
    <div className="container">
      <PaginationTable
        endpoint={"sensor_data"}
        headers={["ID", "Temperature", "Humidity", "Brightness", "Time"]}
      />
    </div>
  );
}

export default SensorData;
