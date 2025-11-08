import React from 'react';
import StatCard from '../Common/StatCard';
import TransactionList from '../Transactions/TransactionList';
import RiskChart from '../Analytics/RiskChart';
import { AlertTriangle, Shield, Clock, TrendingUp, DollarSign } from 'lucide-react';
import './Dashboard.css';

const Dashboard = ({ stats, transactions }) => {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Fraud Detection Dashboard</h1>
        <p>Real-time monitoring and analytics for financial transactions</p>
      </div>

      {/* Statistics Cards */}
      <div className="stats-grid">
        <StatCard
          icon={<Shield size={24} />}
          title="Total Transactions"
          value={stats.totalTransactions.toLocaleString()}
          change="+12.4%"
          trend="up"
        />
        <StatCard
          icon={<AlertTriangle size={24} />}
          title="Fraud Detected"
          value={stats.fraudDetected}
          change="+5.2%"
          trend="up"
          variant="danger"
        />
        <StatCard
          icon={<Clock size={24} />}
          title="Avg Response Time"
          value={`${stats.avgResponseTime}ms`}
          change="-8.7%"
          trend="down"
        />
        <StatCard
          icon={<TrendingUp size={24} />}
          title="Accuracy Rate"
          value={stats.accuracyRate}
          change="+2.1%"
          trend="up"
          variant="success"
        />
      </div>

      <div className="dashboard-content">
        <div className="chart-section">
          <RiskChart transactions={transactions} />
        </div>
        
        <div className="recent-transactions">
          <div className="section-header">
            <h3>Recent Transactions</h3>
            <span className="view-all">View All</span>
          </div>
          <TransactionList transactions={transactions} limit={8} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;