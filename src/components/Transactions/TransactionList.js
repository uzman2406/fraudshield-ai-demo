import React from 'react';
import { CheckCircle, XCircle, AlertTriangle, Clock, MapPin, User } from 'lucide-react';
import './TransactionList.css';

const TransactionList = ({ transactions, limit }) => {
  const displayTransactions = limit ? transactions.slice(0, limit) : transactions;

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return <CheckCircle size={16} className="status-icon status-approved" />;
      case 'flagged':
        return <AlertTriangle size={16} className="status-icon status-flagged" />;
      case 'blocked':
        return <XCircle size={16} className="status-icon status-blocked" />;
      default:
        return <Clock size={16} className="status-icon status-pending" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'approved':
        return 'Approved';
      case 'flagged':
        return 'Flagged';
      case 'blocked':
        return 'Blocked';
      default:
        return 'Pending';
    }
  };

  const getRiskBadge = (riskLevel) => {
    const riskClasses = {
      low: 'risk-low',
      medium: 'risk-medium',
      high: 'risk-high',
      critical: 'risk-critical'
    };
    
    return <span className={`risk-badge ${riskClasses[riskLevel]}`}>{riskLevel}</span>;
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  if (displayTransactions.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">💳</div>
        <h3>No transactions found</h3>
        <p>Try adjusting your filters to see more results</p>
      </div>
    );
  }

  return (
    <div className="transaction-list">
      {displayTransactions.map((transaction, index) => (
        <div key={`${transaction.id}-${index}`} className="transaction-item">
          <div className="transaction-icon">
            {getStatusIcon(transaction.status)}
          </div>
          
          <div className="transaction-main">
            <div className="transaction-header">
              <div className="merchant-info">
                <h4 className="merchant">{transaction.merchant}</h4>
                <div className="transaction-meta">
                  <span className="meta-item">
                    <MapPin size={12} />
                    {transaction.location}
                  </span>
                  <span className="meta-item">
                    <User size={12} />
                    {transaction.userId}
                  </span>
                </div>
              </div>
              <div className="amount-container">
                <span className="amount">{formatAmount(transaction.amount)}</span>
                <span className="time">{transaction.time}</span>
              </div>
            </div>
            
            <div className="transaction-footer">
              <div className="status-container">
                <span className={`status-text status-${transaction.status}`}>
                  {getStatusText(transaction.status)}
                </span>
                {getRiskBadge(transaction.riskLevel)}
              </div>
              <div className="probability-container">
                <span className="probability-label">Risk Score</span>
                <div className="probability-bar">
                  <div 
                    className={`probability-fill risk-${transaction.riskLevel}`}
                    style={{ width: `${transaction.probability}%` }}
                  ></div>
                </div>
                <span className="probability-value">{transaction.probability}%</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionList;