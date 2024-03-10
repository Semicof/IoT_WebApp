import React, { useState, useEffect } from "react";
import "../../styles/Status.css";

function getStatusGradient(value, name) {
  const thresholds = {
    temperature: {
      low: 10,
      medium: 20,
      high: 30,
    },
    humidity: {
      low: 30,
      medium: 50,
      high: 70,
    },
    brightness: {
      low: 10,
      medium: 100,
      high: 124,
    },
  };

  const gradients = {
    temperature: {
      low: "linear-gradient(319deg, #FF6347 0%, #FFA07A 37%, #FFFFFF 100%)",
      medium: "linear-gradient(319deg, #FF4500 0%, #FF6347 37%, #FFFFFF 100%)",
      high: "linear-gradient(319deg, #FF0000 0%, #FF4500 37%, #FFFFFF 100%)",
    },
    humidity: {
      low: "linear-gradient(319deg, #4682B4 0%, #87CEEB 37%, #FFFFFF 100%)",
      medium: "linear-gradient(319deg, #1E90FF 0%, #4682B4 37%, #FFFFFF 100%)",
      high: "linear-gradient(319deg, #0000FF 0%, #1E90FF 37%, #FFFFFF 100%)",
    },
    brightness: {
      high: "linear-gradient(319deg, #FFD700 0%, #FFEA00 37%, #FFFFFF 100%)",
      medium: "linear-gradient(319deg, #FFC300 0%, #FFD700 37%, #FFFFFF 100%)",
      low: "linear-gradient(319deg, #FFA500 0%, #FFC300 37%, #FFFFFF 100%)",
    },
  };

  if (value < thresholds[name].low) {
    return gradients[name].low;
  } else if (thresholds[name].low <= value && value < thresholds[name].medium) {
    return gradients[name].medium;
  } else if (value >= thresholds[name].medium) {
    return gradients[name].high;
  }
}

function Status({ name, data }) {
  const [backgroundGradient, setBackgroundGradient] = useState(getStatusGradient(data, name));

  useEffect(() => {
    setBackgroundGradient(getStatusGradient(data, name));
  }, [data, name]);

  let imgSrc, label;

  switch (name) {
    case "temperature":
      imgSrc = "/imgs/status/temperature.png";
      label = `${data} °C`;
      break;
    case "humidity":
      imgSrc = "/imgs/status/humidity.png";
      label = `${data} %`;
      break;
    case "brightness":
      imgSrc = "/imgs/status/brightness.png";
      label = `${data} Lux`;
      break;
    default:
      break;
  }

  return (
    <div className="status" style={{ background: backgroundGradient }}>
      <img src={imgSrc} alt={name} className="sensor-img" style={{ width: "30%", height: "60%" }} />
      <label htmlFor={name} className="label">
        {label}
      </label>
    </div>
  );
}

export default Status;
