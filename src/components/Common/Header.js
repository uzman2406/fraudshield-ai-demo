import React from 'react';
import { Shield, Bell, User, Settings, LogOut } from 'lucide-react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">
          <Shield size={28} className="logo-icon" />
          <div className="logo-text">
            <h1>FraudShield AI</h1>
            <span>Real-time Protection</span>
          </div>
        </div>
      </div>
      
      <div className="header-center">
        <div className="status-indicator">
          <div className="status-dot live"></div>
          <span>System Live</span>
        </div>
      </div>
      
      <div className="header-right">
        <div className="header-actions">
          <button className="header-btn notification-btn">
            <Bell size={20} />
            <span className="notification-badge">3</span>
          </button>
          <button className="header-btn">
            <Settings size={20} />
          </button>
          <div className="user-menu">
            <button className="user-btn">
              <div className="user-avatar">
                <User size={18} />
              </div>
              <span className="user-name">Admin</span>
            </button>
            <div className="user-dropdown">
              <button className="dropdown-item">
                <User size={16} />
                <span>Profile</span>
              </button>
              <button className="dropdown-item">
                <Settings size={16} />
                <span>Settings</span>
              </button>
              <div className="dropdown-divider"></div>
              <button className="dropdown-item logout">
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;