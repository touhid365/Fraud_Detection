import React, { useState } from 'react';
import '../styles/TransactionForm.css';

const TransactionForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    amount: '',
    merchant: '',
    description: '',
    location: {
      city: '',
      country: ''
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('location')) {
      const field = name.split('.')[1];
      setFormData({
        ...formData,
        location: {
          ...formData.location,
          [field]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      amount: '',
      merchant: '',
      description: '',
      location: {
        city: '',
        country: ''
      }
    });
  };

  return (
    <div className="transaction-form-card">
      <h2>Add New Transaction</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Amount</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              step="0.01"
              required
            />
          </div>
          <div className="form-group">
            <label>Merchant</label>
            <input
              type="text"
              name="merchant"
              value={formData.merchant}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>City</label>
            <input
              type="text"
              name="location.city"
              value={formData.location.city}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Country</label>
            <input
              type="text"
              name="location.country"
              value={formData.location.country}
              onChange={handleChange}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Submit Transaction</button>
      </form>
    </div>
  );
};

export default TransactionForm;
