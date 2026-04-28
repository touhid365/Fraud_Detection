import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import '../styles/Analytics.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Analytics = () => {
  const [trends, setTrends] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchTrends();
  }, []);

  const fetchTrends = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/analytics/trends', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTrends(response.data);
    } catch (error) {
      console.error('Error fetching trends:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="container"><p>Loading analytics...</p></div>;

  if (!trends) {
    return <div className="container"><p>No data available</p></div>;
  }

  const dates = Object.keys(trends).sort();
  const totalTransactions = dates.map(date => trends[date].total);
  const fraudulentTransactions = dates.map(date => trends[date].fraudulent);

  const chartData = {
    labels: dates,
    datasets: [
      {
        label: 'Total Transactions',
        data: totalTransactions,
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Fraudulent Transactions',
        data: fraudulentTransactions,
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Transaction Trends Over Time',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="container">
      <h1>Analytics</h1>
      <div className="analytics-card">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default Analytics;
