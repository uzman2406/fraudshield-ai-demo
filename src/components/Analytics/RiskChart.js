import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, AlertTriangle } from 'lucide-react';
import './RiskChart.css';

const RiskChart = ({ transactions }) => {
  // Process data for the risk chart
  const chartData = transactions.slice(0, 20).map((tx, index) => ({
    name: `Tx${index + 1}`,
    risk: tx.probability,
    amount: tx.amount,
    status: tx.status,
    time: tx.time
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = chartData.find(item => item.name === label);
      return (
        <div className="risk-tooltip">
          <div className="tooltip-header">
            <span className="transaction-id">{label}</span>
            <span className={`status-badge status-${data?.status}`}>
              {data?.status}
            </span>
          </div>
          <div className="tooltip-content">
            {payload.map((entry, index) => (
              <div key={index} className="tooltip-item">
                <span className="tooltip-label" style={{ color: entry.color }}>
                  {entry.dataKey === 'risk' ? 'Risk Score' : 'Amount'}:
                </span>
                <span className="tooltip-value">
                  {entry.dataKey === 'risk' ? `${entry.value}%` : `$${entry.value}`}
                </span>
              </div>
            ))}
            <div className="tooltip-item">
              <span className="tooltip-label">Time:</span>
              <span className="tooltip-value">{data?.time}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="risk-chart">
      <div className="chart-header">
        <div className="chart-title">
          <TrendingUp size={20} />
          <h3>Real-time Risk Monitoring</h3>
        </div>
        <div className="chart-legend">
          <div className="legend-item">
            <div className="legend-color risk-color"></div>
            <span>Risk Score (%)</span>
          </div>
          <div className="legend-item">
            <div className="legend-color amount-color"></div>
            <span>Amount ($)</span>
          </div>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="name" 
            tick={{ fill: '#666', fontSize: 12 }}
            axisLine={false}
          />
          <YAxis 
            yAxisId="left"
            tick={{ fill: '#666' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis 
            yAxisId="right"
            orientation="right"
            tick={{ fill: '#666' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line 
            yAxisId="left"
            type="monotone" 
            dataKey="risk" 
            stroke="#ff4d4f" 
            strokeWidth={3}
            dot={{ fill: '#ff4d4f', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: '#ff4d4f', strokeWidth: 2 }}
            name="Risk Score %"
          />
          <Line 
            yAxisId="right"
            type="monotone" 
            dataKey="amount" 
            stroke="#8884d8" 
            strokeWidth={2}
            strokeDasharray="3 3"
            dot={{ fill: '#8884d8', strokeWidth: 2, r: 3 }}
            activeDot={{ r: 5, stroke: '#8884d8', strokeWidth: 2 }}
            name="Amount $"
          />
        </LineChart>
      </ResponsiveContainer>
      
      <div className="chart-footer">
        <div className="risk-indicators">
          <div className="risk-indicator low">
            <span className="indicator-dot"></span>
            <span>Low Risk (0-30%)</span>
          </div>
          <div className="risk-indicator medium">
            <span className="indicator-dot"></span>
            <span>Medium Risk (31-60%)</span>
          </div>
          <div className="risk-indicator high">
            <span className="indicator-dot"></span>
            <span>High Risk (61-100%)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskChart;