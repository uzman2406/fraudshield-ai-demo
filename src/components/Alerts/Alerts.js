import React, { useState } from 'react';
import AlertItem from './AlertItem';
import { Bell, CheckCircle, XCircle, Filter, Search } from 'lucide-react';
import './Alerts.css';

const Alerts = ({ alerts }) => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAlerts = alerts.filter(alert => {
    if (filter !== 'all' && alert.severity !== filter) return false;
    if (searchTerm && !alert.message.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const criticalAlerts = filteredAlerts.filter(alert => alert.severity === 'critical');
  const highAlerts = filteredAlerts.filter(alert => alert.severity === 'high');
  const mediumAlerts = filteredAlerts.filter(alert => alert.severity === 'medium');

  const markAllAsRead = () => {
    // In a real app, this would update the alert status
    console.log('Marking all alerts as read');
  };

  const clearAllAlerts = () => {
    // In a real app, this would clear all alerts
    console.log('Clearing all alerts');
  };

  return (
    <div className="alerts">
      <div className="alerts-header">
        <div className="header-title">
          <div className="title-with-badge">
            <Bell size={24} />
            <h2>Fraud Alerts</h2>
            <span className="alert-count">{alerts.length}</span>
          </div>
          <p>Real-time fraud alerts and notifications</p>
        </div>
        <div className="header-actions">
          <div className="search-box">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search alerts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select 
            className="filter-select"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Severity</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
          </select>
          <button className="action-btn success" onClick={markAllAsRead}>
            <CheckCircle size={16} />
            Mark All Read
          </button>
          <button className="action-btn danger" onClick={clearAllAlerts}>
            <XCircle size={16} />
            Clear All
          </button>
        </div>
      </div>

      {filteredAlerts.length === 0 ? (
        <div className="empty-alerts">
          <div className="empty-icon">🎉</div>
          <h3>No Alerts Found</h3>
          <p>All clear! No fraud alerts match your current filters.</p>
        </div>
      ) : (
        <div className="alerts-container">
          {criticalAlerts.length > 0 && (
            <div className="alert-section">
              <div className="section-header critical">
                <h3 className="section-title">
                  <span className="severity-dot critical-dot"></span>
                  Critical Alerts
                </h3>
                <span className="section-count">{criticalAlerts.length}</span>
              </div>
              <div className="alerts-list">
                {criticalAlerts.map(alert => (
                  <AlertItem key={alert.id} alert={alert} />
                ))}
              </div>
            </div>
          )}

          {highAlerts.length > 0 && (
            <div className="alert-section">
              <div className="section-header high">
                <h3 className="section-title">
                  <span className="severity-dot high-dot"></span>
                  High Priority
                </h3>
                <span className="section-count">{highAlerts.length}</span>
              </div>
              <div className="alerts-list">
                {highAlerts.map(alert => (
                  <AlertItem key={alert.id} alert={alert} />
                ))}
              </div>
            </div>
          )}

          {mediumAlerts.length > 0 && (
            <div className="alert-section">
              <div className="section-header medium">
                <h3 className="section-title">
                  <span className="severity-dot medium-dot"></span>
                  Medium Priority
                </h3>
                <span className="section-count">{mediumAlerts.length}</span>
              </div>
              <div className="alerts-list">
                {mediumAlerts.map(alert => (
                  <AlertItem key={alert.id} alert={alert} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="alerts-summary">
        <div className="summary-stats">
          <div className="stat-item">
            <span className="stat-label">Total Alerts:</span>
            <span className="stat-value">{alerts.length}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Critical:</span>
            <span className="stat-value critical">{criticalAlerts.length}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">High:</span>
            <span className="stat-value high">{highAlerts.length}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Medium:</span>
            <span className="stat-value medium">{mediumAlerts.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alerts;