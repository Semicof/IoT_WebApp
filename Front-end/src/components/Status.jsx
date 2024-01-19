import React, { useState, useEffect } from "react";
import "./Status.css";

function getStatusColor(value, name) {
  const thresholds = {
    temperature: {
      low: 15,
      medium: 25,
      high: 35,
    },
    humidity: {
      low: 30,
      medium: 50,
      high: 70,
    },
    brightness: {
      low: 5000,
      medium: 30000,
      high: 80000,
    },
  };

  const colors = {
    temperature: {
      low: "rgb(198, 198, 245)",
      medium: "rgb(64, 161, 64)",
      high: "red",
    },
    humidity: {
      low: "#DCF2F1",
      medium: "#7FC7D9",
      high: "#365486",
    },
    brightness: {
      low: "#FFC47E",
      medium: "#FFE382",
      high: "#FFF78A",
    },
  };

  if (value < thresholds[name].low) {
    return colors[name].low;
  } else if (thresholds[name].low <= value && value < thresholds[name].medium) {
    return colors[name].medium;
  } else if(value>=thresholds[name].medium) {
    return colors[name].high;
  }
}

function Status({ name, data }) {
  const [backgroundColor, setBackgroundColor] = useState(getStatusColor(data, name));

  useEffect(() => {
    setBackgroundColor(getStatusColor(data, name));
  }, [data, name]);

  let imgSrc, label;

  switch (name) {
    case "temperature":
      imgSrc = "/imgs/status/temperature.png";
      label = `${data.toFixed(2)} °C`;
      break;
    case "humidity":
      imgSrc = "/imgs/status/humidity.png";
      label = `${data.toFixed(2)} %`;
      break;
    case "brightness":
      imgSrc = "/imgs/status/brightness.png";
      label = `${data.toFixed(2)} Lux`;
      break;
    default:
      break;
  }

  return (
    <div className="status" style={{ backgroundColor }}>
      <img src={imgSrc} alt={name} className="sensor-img" style={{ width: "30%", height: "60%" }} />
      <label htmlFor={name} className="label">
        {label}
      </label>
    </div>
  );
}

export default Status;
