import React, { useState, useEffect } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, SubTitle } from "chart.js";
import { Line } from "react-chartjs-2";
import "./StatusChart.css";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const StatusChart = ({ allData }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: `State Chart`,
      },
    },
  };

  const temperatureData = allData.map((data) => ({
    timestamp: data.date,
    value: data.temperatureData,
  }));

  const humidityData = allData.map((data) => ({
    timestamp: data.date,
    value: data.humidityData,
  }));

  const brightnessData = allData.map((data) => ({
    timestamp: data.date,
    value: data.brightnessData,
  }));

  const labels = temperatureData.map((data) => data.timestamp);

  const data = {
    labels,
    datasets: [
      {
        label: "Temperature",
        data: temperatureData.map((d) => d.value),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Humidity",
        data: humidityData.map((d) => d.value),
        borderColor: "rgb(39, 60, 117)",
        backgroundColor: "rgba(39, 60, 117, 0.5)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Brightness",
        data: brightnessData.map((d) => d.value),
        borderColor: "rgb(246, 229, 141)",
        backgroundColor: "rgba(246, 229, 141, 0.5)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="chart">
      <Line options={options} data={data} />
    </div>
  );
};

export default StatusChart;
