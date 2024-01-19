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
import statusData from "../data/data.json";
import "./StatusChart.css";
const { temperatureData, humidityData, brightnessData } = statusData;

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);



const StatusChart = () => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: `Biểu đồ Nhiệt độ`,
      },
    },
  };
  
  const labels = temperatureData.map((data) => data.timestamp);
  
  const data = {
    labels,
    datasets: [
      {
        label: "Temperature",
        data: temperatureData.map((d) => d.value),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        fill:true,
        tension:0.4
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
