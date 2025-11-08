import React from 'react';
import { 
  LayoutDashboard, 
  CreditCard, 
  BarChart3, 
  Bell, 
  Settings, 
  Shield,
  Activity
} from 'lucide-react';
import './Sidebar.css';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'transactions', label: 'Transactions', icon: <CreditCard size={20} /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 size={20} /> },
    { id: 'alerts', label: 'Alerts', icon: <Bell size={20} /> },
  ];

  const secondaryItems = [
    { id: 'monitoring', label: 'System Monitoring', icon: <Activity size={20} /> },
    { id: 'security', label: 'Security', icon: <Shield size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  return (
    <nav className="sidebar">
      <div className="sidebar-content">
        <div className="sidebar-main">
          <div className="sidebar-header">
            <h3>Navigation</h3>
          </div>
          
          <div className="sidebar-menu">
            {menuItems.map(item => (
              <button
                key={item.id}
                className={`menu-item ${activeTab === item.id ? 'active' : ''}`}
                onClick={() => setActiveTab(item.id)}
              >
                <div className="menu-icon">
                  {item.icon}
                </div>
                <span className="menu-label">{item.label}</span>
                {activeTab === item.id && <div className="active-indicator"></div>}
              </button>
            ))}
          </div>
        </div>

        <div className="sidebar-footer">
          <div className="sidebar-section">
            <div className="section-label">System</div>
            {secondaryItems.map(item => (
              <button
                key={item.id}
                className={`menu-item ${activeTab === item.id ? 'active' : ''}`}
                onClick={() => setActiveTab(item.id)}
              >
                <div className="menu-icon">
                  {item.icon}
                </div>
                <span className="menu-label">{item.label}</span>
              </button>
            ))}
          </div>
          
          <div className="sidebar-info">
            <div className="system-status">
              <div className="status-dot"></div>
              <span>All Systems Operational</span>
            </div>
            <div className="version">v2.1.0</div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;