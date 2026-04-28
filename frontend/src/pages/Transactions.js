import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';
import '../styles/Transactions.css';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/transactions', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTransactionSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:5000/api/transactions', data, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTransactions([response.data, ...transactions]);
      setShowForm(false);
    } catch (error) {
      console.error('Error creating transaction:', error);
    }
  };

  return (
    <div className="container">
      <div className="transactions-header">
        <h1>Transactions</h1>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'New Transaction'}
        </button>
      </div>

      {showForm && <TransactionForm onSubmit={handleTransactionSubmit} />}

      {loading ? (
        <p>Loading transactions...</p>
      ) : (
        <TransactionList transactions={transactions} />
      )}
    </div>
  );
};

export default Transactions;
