import React from 'react';
import { Filter, X } from 'lucide-react';
import './TransactionFilter.css';

const TransactionFilter = ({ filters, setFilters }) => {
  const clearFilters = () => {
    setFilters({
      status: 'all',
      riskLevel: 'all',
      search: ''
    });
  };

  const hasActiveFilters = filters.status !== 'all' || filters.riskLevel !== 'all' || filters.search !== '';

  return (
    <div className="transaction-filter">
      <div className="filter-header">
        <div className="filter-title">
          <Filter size={18} />
          <span>Filters</span>
        </div>
        {hasActiveFilters && (
          <button className="clear-filters" onClick={clearFilters}>
            <X size={14} />
            Clear All
          </button>
        )}
      </div>

      <div className="filter-controls">
        <div className="filter-group">
          <label>Transaction Status</label>
          <select 
            value={filters.status} 
            onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
          >
            <option value="all">All Status</option>
            <option value="approved">Approved</option>
            <option value="flagged">Flagged</option>
            <option value="blocked">Blocked</option>
            <option value="pending">Pending</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Risk Level</label>
          <select 
            value={filters.riskLevel} 
            onChange={(e) => setFilters(prev => ({ ...prev, riskLevel: e.target.value }))}
          >
            <option value="all">All Levels</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="active-filters">
          <span className="active-filters-label">Active Filters:</span>
          <div className="filter-tags">
            {filters.status !== 'all' && (
              <span className="filter-tag">
                Status: {filters.status}
                <button onClick={() => setFilters(prev => ({ ...prev, status: 'all' }))}>
                  <X size={12} />
                </button>
              </span>
            )}
            {filters.riskLevel !== 'all' && (
              <span className="filter-tag">
                Risk: {filters.riskLevel}
                <button onClick={() => setFilters(prev => ({ ...prev, riskLevel: 'all' }))}>
                  <X size={12} />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionFilter;