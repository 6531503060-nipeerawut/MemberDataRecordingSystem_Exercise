import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const getAgeRange = (age) => {
  if (age <= 20) return "≤20";
  if (age <= 30) return "21-30";
  if (age <= 40) return "31-40";
  if (age <= 50) return "41-50";
  return "51+";
};

export default function MemberReport({ members }) {
  const ageGroups = {};

  members.forEach((m) => {
    const age = new Date().getFullYear() - new Date(m.birthdate).getFullYear();
    const range = getAgeRange(age);
    ageGroups[range] = (ageGroups[range] || 0) + 1;
  });

  const chartData = {
    labels: Object.keys(ageGroups),
    datasets: [
      {
        label: "จำนวนสมาชิก",
        data: Object.values(ageGroups),
        backgroundColor: "rgba(99, 102, 241, 0.8)", // indigo-500
        borderRadius: 6,
        barPercentage: 0.6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "#4c51bf", // indigo-600
          font: {
            size: 14,
            weight: "600",
          },
        },
      },
      title: {
        display: false,
        text: "รายงานจำนวนสมาชิกตามช่วงอายุ",
        color: "#4338ca", // indigo-700
        font: {
          size: 18,
          weight: "700",
        },
      },
      tooltip: {
        backgroundColor: "rgba(67, 56, 202, 0.9)", // indigo-700 with opacity
        titleFont: {
          size: 14,
          weight: "700",
        },
        bodyFont: {
          size: 13,
        },
        padding: 8,
        cornerRadius: 6,
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#5a67d8", // indigo-500
          font: {
            size: 14,
          },
        },
        grid: {
          display: false,
          drawBorder: false,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "#5a67d8",
          font: {
            size: 14,
          },
          stepSize: 1,
        },
        grid: {
          color: "rgba(99, 102, 241, 0.2)", // indigo-200
          borderDash: [5, 5],
        },
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-indigo-300 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-indigo-700 text-center drop-shadow-sm">
        รายงานจำนวนสมาชิกตามช่วงอายุ
      </h2>
      <Bar data={chartData} options={options} />
    </div>
  );
}