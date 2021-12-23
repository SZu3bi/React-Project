import { Doughnut } from "react-chartjs-2";
import React, { useState, useEffect, useCallback } from "react";

const data = {
  labels: ["salah", "hasan", "Zaid", "Baraa", "Omar", "malek"],
  datasets: [
    {
      label: "Sales",
      data: [30, 2, 33, 1, 6, 35],
      borderColor: ["rgba(255,206,86,0.2)"],
      backgroundColor: [
        "rgba(232,99,132,1)",
        "rgba(232,211,6,1)",
        "rgba(54,162,235,1)",
        "rgba(255,159,64,1)",
        "rgba(153,102,255,1)",
        "red",
      ],
      pointBackgroundColor: "rgba(255,206,86,0.2)",
      hoverOffset: 10,
      weight: 0.3,
      // backgroundImage: 'lightblue url("https://www.chartjs.org/img/chartjs-logo.svgf") no-repeat fixed center'
    },
  ],
};

const options = {
  plugins: {
    title: {
      display: true,
      text: "Doughnut Chart",
      color: "blue",
      font: {
        size: 34,
      },
      padding: {
        top: 30,
        bottom: 30,
      },
      responsive: true,
      animation: {
        animateScale: true,
        color: true,
      },
    },
  },
};
export const DoughnutChart = () => {
  return (
    <div style={{ background: "rgb(255 252 252)", borderRadius: "100px" }}>
      <Doughnut data={data} options={options} />
    </div>
  );
};
