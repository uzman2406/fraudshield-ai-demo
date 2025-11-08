import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import './StatCard.css';

const StatCard = ({ icon, title, value, change, trend, variant = 'default' }) => {
  const isPositive = trend === 'up';
  
  return (
    <div className={`stat-card ${variant}`}>
      <div className="stat-icon-wrapper">
        {icon}
      </div>
      
      <div className="stat-content">
        <div className="stat-main">
          <h3 className="stat-value">{value}</h3>
          <div className={`stat-change ${isPositive ? 'positive' : 'negative'}`}>
            {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            <span>{change}</span>
          </div>
        </div>
        <p className="stat-title">{title}</p>
      </div>
      
      <div className="stat-background">
        <div className="stat-wave"></div>
      </div>
    </div>
  );
};

export default StatCard;