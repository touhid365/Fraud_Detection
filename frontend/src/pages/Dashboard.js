import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StatCard from '../components/StatCard';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/analytics/stats', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="container"><p>Loading...</p></div>;

  return (
    <div className="container">
      <h1>Dashboard</h1>
      {stats && (
        <div className="stats-grid">
          <StatCard title="Total Transactions" value={stats.total} icon="📊" />
          <StatCard title="Fraudulent" value={stats.fraudulent} icon="⚠️" color="danger" />
          <StatCard title="Flagged" value={stats.flagged} icon="🚩" color="warning" />
          <StatCard title="Approved" value={stats.approved} icon="✅" color="success" />
          <StatCard title="Fraud Rate" value={`${stats.fraudRate}%`} icon="📈" />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
