import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard/Dashboard';
import TransactionMonitor from './components/Transactions/TransactionMonitor';
import Analytics from './components/Analytics/Analytics';
import Alerts from './components/Alerts/Alerts';
import Header from './components/Common/Header';
import Sidebar from './components/Common/Sidebar';
import { generateMockData, simulateRealTimeData } from './services/mockData';
import './styles/App.css';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [transactions, setTransactions] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [stats, setStats] = useState({
    totalTransactions: 0,
    fraudDetected: 0,
    falsePositives: 0,
    avgResponseTime: 0,
    accuracyRate: '95.2%'
  });

  useEffect(() => {
    // Initialize with mock data
    const initialData = generateMockData();
    setTransactions(initialData.transactions);
    setAlerts(initialData.alerts);
    setStats(initialData.stats);

    // Simulate real-time data updates
    const interval = setInterval(() => {
      const newData = simulateRealTimeData();
      setTransactions(prev => [newData.transaction, ...prev.slice(0, 199)]);
      
      if (newData.alert) {
        setAlerts(prev => [newData.alert, ...prev.slice(0, 49)]);
      }
      
      // Update stats
      setStats(prev => ({
        ...prev,
        totalTransactions: prev.totalTransactions + 1,
        fraudDetected: newData.alert ? prev.fraudDetected + 1 : prev.fraudDetected
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard stats={stats} transactions={transactions.slice(0, 10)} />;
      case 'transactions':
        return <TransactionMonitor transactions={transactions} />;
      case 'analytics':
        return <Analytics transactions={transactions} />;
      case 'alerts':
        return <Alerts alerts={alerts} />;
      default:
        return <Dashboard stats={stats} transactions={transactions.slice(0, 10)} />;
    }
  };

  return (
    <div className="app">
      <Header />
      <div className="app-body">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="main-content">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;