import React from 'react';
import '../styles/Analytics.css';
import { Line, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Analytics = () => {
  const lineChartData = {
    labels: ['8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM'],
    datasets: [
      {
        label: 'Error',
        data: [1056, 800, 1100, 689, 900, 1300, 1000],
        borderColor: '#000000',
        borderWidth: 2,
        pointRadius: 4,
        pointBackgroundColor: '#000000',
        tension: 0.4,
      },
      {
        label: 'Breakdown',
        data: [689, 700, 600, 800, 500, 600, 900],
        borderColor: '#C5E3BF',
        borderWidth: 2,
        pointRadius: 4,
        pointBackgroundColor: '#C5E3BF',
        tension: 0.4,
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true, // Enable the legend
        position: 'top', // Place the legend at the top
        labels: {
          usePointStyle: true, // Use a point style for better aesthetics
          boxWidth: 10, // Adjust box size for the legend
          padding: 20, // Add padding between legend items
          font: {
            size: 14, // Adjust the font size for readability
            family: 'Arial, sans-serif', // Use a clean font
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: '#e0e0e0',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  const doughnutChartData = {
    labels: ['200', '300', '500'],
    datasets: [
      {
        data: [3580, 4160, 6180],
        backgroundColor: ['#4A90E2', '#50E3C2', '#F5A623'],
        hoverOffset: 4,
      },
    ],
  };

  const doughnutChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: {
            size: 14,
            family: 'Arial, sans-serif',
          },
        },
      },
    },
  };

  return (
    <div className="analytics-container">
      <div className="header-stats">
        <div className="stat-card blue">
          <p>45,940</p>
          <span>Redirects</span>
          <div className="growth">+5.78%</div>
        </div>
        <div className="stat-card green">
          <p>56.1%</p>
          <span>Success rate</span>
          <div className="growth">+3.85%</div>
        </div>
        <div className="stat-card orange">
          <p>3,100</p>
          <span>Errors</span>
          <div className="growth">+1.64%</div>
        </div>
        <div className="stat-card black">
          <p>36.2%</p>
          <span>Error ratio</span>
          <div className="growth">+3.28%</div>
        </div>
      </div>

      <div className="chart-section">
        <div className="line-chart">
        <h2>Response</h2>
          <Line data={lineChartData} options={lineChartOptions} />
        </div>
        <div className="doughnut-chart">
          <h2>Response Code Breakdown</h2>
          <Doughnut data={doughnutChartData} options={doughnutChartOptions} />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
