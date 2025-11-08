import React from 'react';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';
import { TrendingUp, AlertTriangle, DollarSign, Clock } from 'lucide-react';
import './Analytics.css';

const Analytics = ({ transactions }) => {
  // Process data for charts
  const hourlyData = processHourlyData(transactions);
  const riskDistribution = processRiskDistribution(transactions);
  const fraudByType = processFraudByType(transactions);
  const amountDistribution = processAmountDistribution(transactions);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d'];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">{`${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} className="tooltip-item" style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="analytics">
      <div className="analytics-header">
        <h1>Fraud Analytics Dashboard</h1>
        <p>Comprehensive analysis of fraud patterns and transaction trends</p>
      </div>

      <div className="analytics-grid">
        <div className="chart-card full-width">
          <div className="chart-header">
            <h3>
              <TrendingUp size={20} />
              Transactions & Fraud by Hour
            </h3>
            <span className="chart-subtitle">24-hour activity pattern</span>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={hourlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="hour" 
                tick={{ fill: '#666' }}
                tickFormatter={(value) => `${value}:00`}
              />
              <YAxis tick={{ fill: '#666' }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="transactions" 
                stroke="#8884d8" 
                strokeWidth={3}
                dot={{ fill: '#8884d8', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#8884d8', strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="fraud" 
                stroke="#ff4d4f" 
                strokeWidth={3}
                dot={{ fill: '#ff4d4f', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#ff4d4f', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <h3>
              <AlertTriangle size={20} />
              Risk Distribution
            </h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={riskDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {riskDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} transactions`, 'Count']} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <h3>
              <DollarSign size={20} />
              Fraud by Type
            </h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={fraudByType}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="type" 
                angle={-45}
                textAnchor="end"
                height={80}
                tick={{ fill: '#666', fontSize: 12 }}
              />
              <YAxis tick={{ fill: '#666' }} />
              <Tooltip />
              <Bar dataKey="count" fill="#ff4d4f" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <h3>
              <Clock size={20} />
              Amount Distribution
            </h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={amountDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="range" 
                tick={{ fill: '#666' }}
              />
              <YAxis tick={{ fill: '#666' }} />
              <Tooltip />
              <Bar dataKey="count" fill="#00C49F" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="analytics-summary">
        <div className="summary-card">
          <h4>Key Insights</h4>
          <ul>
            <li>Peak fraud activity occurs between 14:00-18:00</li>
            <li>Card Not Present fraud is the most common type</li>
            <li>High-risk transactions average $450 in value</li>
            <li>Detection accuracy has improved by 12% this month</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// Helper functions for data processing
const processHourlyData = (transactions) => {
  const hours = Array.from({ length: 24 }, (_, i) => ({ 
    hour: i, 
    transactions: 0, 
    fraud: 0 
  }));
  
  transactions.forEach(transaction => {
    const hour = new Date(transaction.timestamp).getHours();
    hours[hour].transactions++;
    if (transaction.status === 'flagged' || transaction.status === 'blocked') {
      hours[hour].fraud++;
    }
  });
  
  return hours;
};

const processRiskDistribution = (transactions) => {
  const distribution = {
    low: 0,
    medium: 0,
    high: 0,
    critical: 0
  };
  
  transactions.forEach(transaction => {
    distribution[transaction.riskLevel]++;
  });
  
  return Object.entries(distribution).map(([name, value]) => ({ name, value }));
};

const processFraudByType = (transactions) => {
  const types = {};
  
  transactions
    .filter(t => t.status === 'flagged' || t.status === 'blocked')
    .forEach(transaction => {
      const type = transaction.fraudType || 'Unknown';
      types[type] = (types[type] || 0) + 1;
    });
  
  return Object.entries(types)
    .map(([type, count]) => ({ type, count }))
    .sort((a, b) => b.count - a.count);
};

const processAmountDistribution = (transactions) => {
  const ranges = [
    { range: '$0-50', min: 0, max: 50, count: 0 },
    { range: '$50-100', min: 50, max: 100, count: 0 },
    { range: '$100-200', min: 100, max: 200, count: 0 },
    { range: '$200-500', min: 200, max: 500, count: 0 },
    { range: '$500+', min: 500, max: Infinity, count: 0 }
  ];
  
  transactions.forEach(transaction => {
    const amount = transaction.amount;
    const range = ranges.find(r => amount >= r.min && amount < r.max);
    if (range) range.count++;
  });
  
  return ranges;
};

export default Analytics;