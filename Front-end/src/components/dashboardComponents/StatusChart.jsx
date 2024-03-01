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
  TimeScale
} from "chart.js";
import "chartjs-adapter-moment"
import { Line } from "react-chartjs-2";
import "../../styles/StatusChart.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

const StatusChart = ({ allData }) => {
  const latestData = allData.slice(-20);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "black",
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
        type: 'time',
        time: {
          tooltipFormat:'MM/DD/YYYY',
          displayFormats: {
             'millisecond':'HH:mm:ss',
             'second': 'HH:mm:ss',
             'minute': 'HH:mm:ss',
             'hour': 'HH:mm:ss',
             'day': 'HH:mm:ss',
             'week': 'HH:mm:ss',
             'month': 'HH:mm:ss',
             'quarter': 'HH:mm:ss',
             'year': 'HH:mm:ss',
          }
        },
        title: {
          color: "black",
          text: 'Date'
        },
        ticks: {
          color: "black",
        },
      },
      y: {
        title: {
          color: "black",
        },
        ticks: {
          color: "black",
        },
      },
    },
  };
  const temperatureData = latestData.map((data) => ({
    timestamp: data.date,
    value: data.temperatureData,
  }));

  const humidityData = latestData.map((data) => ({
    timestamp: data.date,
    value: data.humidityData,
  }));

  const brightnessData = latestData.map((data) => ({
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
