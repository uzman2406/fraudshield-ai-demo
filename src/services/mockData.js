// Mock data generator for the fraud detection system
export const generateMockData = () => {
  const transactions = Array.from({ length: 50 }, (_, i) => generateTransaction(i));
  const alerts = transactions.filter(t => t.status === 'flagged').map(t => generateAlert(t));
  
  return {
    transactions,
    alerts,
    stats: {
      totalTransactions: transactions.length,
      fraudDetected: alerts.length,
      falsePositives: Math.floor(alerts.length * 0.1),
      avgResponseTime: 87,
      accuracyRate: '96.2%'
    }
  };
};

export const simulateRealTimeData = () => {
  const transaction = generateTransaction(Date.now());
  const alert = transaction.status === 'flagged' ? generateAlert(transaction) : null;
  
  return {
    transaction,
    alert
  };
};

const generateTransaction = (id) => {
  const merchants = [
    'Amazon', 'Starbucks', 'Uber', 'Apple Store', 'Netflix', 
    'Spotify', 'Walmart', 'Target', 'Best Buy', 'McDonald\'s',
    'Airbnb', 'Booking.com', 'Steam', 'PlayStation', 'Microsoft'
  ];
  
  const locations = [
    'New York, NY', 'San Francisco, CA', 'Chicago, IL', 'Miami, FL', 
    'Online', 'London, UK', 'Tokyo, JP', 'Sydney, AU'
  ];
  
  const statuses = ['approved', 'approved', 'approved', 'flagged', 'approved', 'blocked'];
  const fraudTypes = [
    'Card Not Present', 'Account Takeover', 'Friendly Fraud', 
    'Merchant Fraud', 'Identity Theft', 'Phishing'
  ];
  
  const amount = (Math.random() * 1000).toFixed(2);
  const probability = (Math.random() * 100).toFixed(1);
  const status = statuses[Math.floor(Math.random() * statuses.length)];
  const riskLevel = probability > 80 ? 'critical' : probability > 60 ? 'high' : probability > 30 ? 'medium' : 'low';
  
  return {
    id: `txn_${id}`,
    amount: parseFloat(amount),
    merchant: merchants[Math.floor(Math.random() * merchants.length)],
    location: locations[Math.floor(Math.random() * locations.length)],
    timestamp: new Date(Date.now() - Math.random() * 86400000).toISOString(),
    time: new Date().toLocaleTimeString(),
    status: status,
    riskLevel: riskLevel,
    probability: parseFloat(probability),
    fraudType: status === 'flagged' ? fraudTypes[Math.floor(Math.random() * fraudTypes.length)] : null,
    userId: `user_${Math.floor(Math.random() * 1000)}`
  };
};

const generateAlert = (transaction) => {
  const severities = {
    critical: 'critical',
    high: 'high',
    medium: 'medium'
  };
  
  const alertMessages = {
    critical: `CRITICAL: High-value suspicious transaction - $${transaction.amount} at ${transaction.merchant}`,
    high: `ALERT: Unusual activity detected - $${transaction.amount} at ${transaction.merchant}`,
    medium: `Warning: Potential fraud pattern - $${transaction.amount} at ${transaction.merchant}`
  };
  
  return {
    id: `alert_${transaction.id}`,
    transactionId: transaction.id,
    severity: severities[transaction.riskLevel] || 'medium',
    message: alertMessages[severities[transaction.riskLevel]] || alertMessages.medium,
    timestamp: new Date().toISOString(),
    time: new Date().toLocaleTimeString(),
    resolved: false,
    amount: transaction.amount,
    merchant: transaction.merchant
  };
};