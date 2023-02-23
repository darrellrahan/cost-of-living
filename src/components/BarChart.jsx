import React from "react";
import { Bar } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import { useGlobalContext } from "../context";

function BarChart({ chartData }) {
  const { countryData, costData } = useGlobalContext();

  if (costData || countryData.selectedCountry.value) return;

  Chart.register(CategoryScale);

  return (
    <div className="chart-container">
      <Bar
        className="bar-width"
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Cost of Living Index (Current, By Country)",
            },
            legend: {
              display: false,
            },
          },
        }}
      />
    </div>
  );
}

export default BarChart;
