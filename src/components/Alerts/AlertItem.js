import React, { useState } from 'react';
import { CheckCircle, XCircle, Eye, Clock, DollarSign, Store } from 'lucide-react';
import './AlertItem.css';

const AlertItem = ({ alert }) => {
  const [isResolved, setIsResolved] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleResolve = () => {
    setIsResolved(true);
    // In a real app, this would update the alert status in the backend
    console.log('Resolved alert:', alert.id);
  };

  const handleIgnore = () => {
    setIsResolved(true);
    // In a real app, this would mark the alert as ignored
    console.log('Ignored alert:', alert.id);
  };

  const handleViewDetails = () => {
    setIsExpanded(!isExpanded);
  };

  if (isResolved) {
    return null;
  }

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className={`alert-item ${alert.severity}`}>
      <div className="alert-main">
        <div className="alert-content">
          <div className="alert-header">
            <div className="alert-message">
              <span className="alert-icon">
                {alert.severity === 'critical' && '🚨'}
                {alert.severity === 'high' && '⚠️'}
                {alert.severity === 'medium' && '🔔'}
              </span>
              {alert.message}
            </div>
            <div className="alert-severity-badge">
              {alert.severity}
            </div>
          </div>
          
          <div className="alert-details">
            <div className="detail-item">
              <DollarSign size={14} />
              <span>{formatAmount(alert.amount)}</span>
            </div>
            <div className="detail-item">
              <Store size={14} />
              <span>{alert.merchant}</span>
            </div>
            <div className="detail-item">
              <Clock size={14} />
              <span>{alert.time}</span>
            </div>
          </div>

          {isExpanded && (
            <div className="alert-expanded">
              <div className="expanded-section">
                <h4>Transaction Details</h4>
                <div className="detail-grid">
                  <div className="detail-pair">
                    <span className="detail-label">Transaction ID:</span>
                    <span className="detail-value">{alert.transactionId}</span>
                  </div>
                  <div className="detail-pair">
                    <span className="detail-label">Alert ID:</span>
                    <span className="detail-value">{alert.id}</span>
                  </div>
                  <div className="detail-pair">
                    <span className="detail-label">Timestamp:</span>
                    <span className="detail-value">{new Date(alert.timestamp).toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              <div className="expanded-section">
                <h4>Recommended Actions</h4>
                <ul className="action-list">
                  <li>Contact customer for verification</li>
                  <li>Review transaction history</li>
                  <li>Check for similar patterns</li>
                  <li>Update fraud detection rules if needed</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        <div className="alert-actions">
          <button className="alert-btn view-btn" onClick={handleViewDetails}>
            <Eye size={14} />
            {isExpanded ? 'Less' : 'Details'}
          </button>
          <button className="alert-btn resolve-btn" onClick={handleResolve}>
            <CheckCircle size={14} />
            Resolve
          </button>
          <button className="alert-btn ignore-btn" onClick={handleIgnore}>
            <XCircle size={14} />
            Ignore
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertItem;