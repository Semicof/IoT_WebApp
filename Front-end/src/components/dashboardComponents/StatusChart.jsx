import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  SubTitle,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "../../styles/StatusChart.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const StatusChart = ({ allData }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "black", // Change legend label color here
        },
      },
      title: {
        display: true,
        text: `State Chart`,
        color: "black",
      },
    },
    scales: {
      x: {
        title: {
          color: "black", // Change x-axis label color here
        },
        ticks: {
          color: "black", // Change x-axis tick color here
        },
      },
      y: {
        title: {
          color: "black", // Change y-axis label color here
        },
        ticks: {
          color: "black", // Change y-axis tick color here
        },
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
        borderColor: "red",
        backgroundColor: "red",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Humidity",
        data: humidityData.map((d) => d.value),
        borderColor: "blue",
        backgroundColor: "blue",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Brightness",
        data: brightnessData.map((d) => d.value),
        borderColor: "yellow",
        backgroundColor: "yellow",
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
