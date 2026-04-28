import React from 'react';
import '../styles/TransactionList.css';

const TransactionList = ({ transactions }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'success';
      case 'rejected':
        return 'danger';
      case 'flagged':
        return 'warning';
      default:
        return 'primary';
    }
  };

  const getRiskLevel = (isFraud) => {
    return isFraud ? '🔴 High Risk' : '🟢 Low Risk';
  };

  return (
    <div className="transaction-list-card">
      <h2>Recent Transactions</h2>
      {transactions.length === 0 ? (
        <p className="no-data">No transactions yet</p>
      ) : (
        <table className="transaction-table">
          <thead>
            <tr>
              <th>Merchant</th>
              <th>Amount</th>
              <th>Risk Level</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction._id} className={`row-${getStatusColor(transaction.status)}`}>
                <td>{transaction.merchant}</td>
                <td>${transaction.amount.toFixed(2)}</td>
                <td>{getRiskLevel(transaction.isFraud)}</td>
                <td>
                  <span className={`badge badge-${getStatusColor(transaction.status)}`}>
                    {transaction.status}
                  </span>
                </td>
                <td>{new Date(transaction.timestamp).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TransactionList;
