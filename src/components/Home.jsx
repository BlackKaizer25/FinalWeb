import React from 'react';
import '../styles/Home.css';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Home = () => {
  const doughnutData = {
    labels: ['Tourist', 'Business Owners', 'Local Residents'],
    datasets: [
      {
        data: [150, 100, 161],
        backgroundColor: ['#F5A623', '#9B9B9B', '#4A90E2'],
        hoverOffset: 4,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Custom legend handled manually below
      },
    },
  };

  return (
    <div className="home-container">
      {/* Welcome Section */}
      <div className="welcome-section">
        <div className="chart-container">
          <div className="chart-left">
            <h2>Welcome back, Clyde!</h2>
            <p className="subtitle">This is the Explore Damilag system report</p>
            <div className="doughnut-chart-container">
              <Doughnut data={doughnutData} options={doughnutOptions} />
            </div>
            <p className="total-count">Total Users</p>
            <p className="user-count">361</p>
            <p className="last-update">Last update: 2 Hours ago</p>
          </div>
          <div className="vertical-divider"></div>
          <div className="chart-right">
            <div className="legend-item">
              <span className="legend-color" style={{ backgroundColor: '#F5A623' }}></span>
              <span className="legend-label">150 Tourist</span>
            </div>
            <div className="legend-item">
              <span className="legend-color" style={{ backgroundColor: '#9B9B9B' }}></span>
              <span className="legend-label">100 Business Owners</span>
            </div>
            <div className="legend-item">
              <span className="legend-color" style={{ backgroundColor: '#4A90E2' }}></span>
              <span className="legend-label">161 Local Residents</span>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="card new-users">
          <div className="card-icon">🆕</div>
          <p className="card-title">New Users</p>
          <p className="card-number">30</p>
        </div>
        <div className="card active-users">
          <div className="card-icon">👥</div>
          <p className="card-title">Active Users</p>
          <p className="card-number">150</p>
        </div>
        <div className="card new-business">
          <div className="card-icon">💼</div>
          <p className="card-title">New Business</p>
          <p className="card-number">5</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
