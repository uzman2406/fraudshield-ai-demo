import React, { useState } from 'react';
import TransactionList from './TransactionList';
import TransactionFilter from './TransactionFilter';
import { Search, Filter, Download, RefreshCw } from 'lucide-react';
import './TransactionMonitor.css';

const TransactionMonitor = ({ transactions }) => {
  const [filters, setFilters] = useState({
    status: 'all',
    riskLevel: 'all',
    search: ''
  });

  const [isRefreshing, setIsRefreshing] = useState(false);

  const filteredTransactions = transactions.filter(transaction => {
    if (filters.status !== 'all' && transaction.status !== filters.status) return false;
    if (filters.riskLevel !== 'all' && transaction.riskLevel !== filters.riskLevel) return false;
    if (filters.search && !transaction.merchant.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  });

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <div className="transaction-monitor">
      <div className="monitor-header">
        <div className="header-title">
          <h2>Transaction Monitor</h2>
          <p>Real-time monitoring of all financial transactions</p>
        </div>
        <div className="header-actions">
          <div className="search-box">
            <Search size={20} className="search-icon" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={filters.search}
              onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
            />
          </div>
          <button className="icon-btn refresh-btn" onClick={handleRefresh} disabled={isRefreshing}>
            <RefreshCw size={18} className={isRefreshing ? 'refreshing' : ''} />
          </button>
          <button className="export-btn">
            <Download size={16} />
            Export CSV
          </button>
        </div>
      </div>

      <TransactionFilter filters={filters} setFilters={setFilters} />
      
      <div className="transactions-summary">
        <div className="summary-item">
          <span className="summary-label">Total Displayed:</span>
          <span className="summary-value">{filteredTransactions.length}</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Flagged:</span>
          <span className="summary-value flagged">
            {filteredTransactions.filter(t => t.status === 'flagged').length}
          </span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Blocked:</span>
          <span className="summary-value blocked">
            {filteredTransactions.filter(t => t.status === 'blocked').length}
          </span>
        </div>
      </div>
      
      <div className="transactions-container">
        <TransactionList transactions={filteredTransactions} />
      </div>
    </div>
  );
};

export default TransactionMonitor;