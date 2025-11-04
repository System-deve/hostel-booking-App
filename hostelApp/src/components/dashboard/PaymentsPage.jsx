// src/components/dashboard/PaymentsPage.jsx
import React, { useState, useEffect } from 'react';
import { hostelManagerStore } from '../../data/store/HostelManagerStore';

//import './payments.css';
import '../../styles/dashboard.css';

const PaymentsPage = () => {
  const [payments, setPayments] = useState([]);
  const [tenants, setTenants] = useState([]);
  const [filters, setFilters] = useState({
    searchQuery: '',
    tenantId: 'all',
    paymentType: 'all',
    dateRange: 'all'
  });
  const [stats, setStats] = useState({
    totalRevenue: 0,
    monthlyRevenue: 0,
    pendingBalance: 0,
    totalTransactions: 0
  });
  const [showAddPaymentModal, setShowAddPaymentModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
      const filterPayments = () => {
    try {
      const filtered = hostelManagerStore.getFilteredPayments(filters);
      setPayments(filtered);
    } catch (error) {
      console.error('Error filtering payments:', error);
      alert('Error filtering payments: ' + error.message);
    }
  };
    filterPayments();
  }, [filters]);

  const loadData = () => {
    setLoading(true);
    try {
      const allTenants = hostelManagerStore.getManagerTenants();
      setTenants(allTenants);
      
      const paymentsData = hostelManagerStore.getAllPayments();
      setPayments(paymentsData);
      
      const statsData = hostelManagerStore.getPaymentsStats();
      setStats(statsData);
    } catch (error) {
      console.error('Error loading payments:', error);
      alert('Error loading payments: ' + error.message);
    } finally {
      setLoading(false);
    }
  };



  const handleAddPayment = (paymentData) => {
    setLoading(true);
    try {
      const paymentId = hostelManagerStore.addPayment(
        paymentData.roomId, 
        paymentData.tenantId, 
        paymentData
      );
      if (paymentId) {
        loadData();
        setShowAddPaymentModal(false);
        alert('Payment added successfully!');
      } else {
        alert('Failed to add payment: ' + (hostelManagerStore.error || 'Unknown error'));
      }
    } catch (error) {
      alert('Error adding payment: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const exportToCSV = () => {
    try {
      const headers = ['Date', 'Tenant', 'Room', 'Amount', 'Type', 'Method', 'Notes'];
      const csvData = payments.map(payment => [
        payment.date,
        payment.tenantName,
        payment.roomNumber,
        `UGX ${payment.amount.toLocaleString()}`,
        payment.type,
        payment.method,
        payment.notes || ''
      ]);

      const csvContent = [
        headers.join(','),
        ...csvData.map(row => row.map(field => `"${field}"`).join(','))
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `payments-${new Date().toISOString().split('T')[0]}.csv`;
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting CSV:', error);
      alert('Error exporting CSV: ' + error.message);
    }
  };

  const getPaymentMethodColor = (method) => {
    const colors = {
      'cash': '#10b981',
      'mobile money': '#3b82f6',
      'bank': '#8b5cf6'
    };
    return colors[method] || '#6b7280';
  };

  const getPaymentTypeColor = (type) => {
    const colors = {
      'full': '#10b981',
      'partial': '#f59e0b'
    };
    return colors[type] || '#6b7280';
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading-spinner">
          <i className="fas fa-spinner fa-spin"></i>
          <p>Loading payments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="header-content">
          <h1 className="page-title">Payments Management</h1>
          <p className="page-subtitle">Track all payments, revenue, and outstanding balances</p>
        </div>
        <div className="header-actions">
          <button 
            className="btn btn-outline"
            onClick={exportToCSV}
            disabled={loading || payments.length === 0}
          >
            <i className="fas fa-download"></i>
            Export CSV
          </button>
          <button 
            className="btn btn-primary"
            onClick={() => setShowAddPaymentModal(true)}
            disabled={loading}
          >
            <i className="fas fa-plus"></i>
            Add Payment
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="stats-summary">
        <div className="stat-card revenue">
          <div className="stat-icon">
            <i className="fas fa-money-bill-wave"></i>
          </div>
          <div className="stat-content">
            <div className="stat-value">UGX {stats.totalRevenue?.toLocaleString() || '0'}</div>
            <div className="stat-label">Total Revenue</div>
          </div>
        </div>
        <div className="stat-card monthly">
          <div className="stat-icon">
            <i className="fas fa-calendar-alt"></i>
          </div>
          <div className="stat-content">
            <div className="stat-value">UGX {stats.monthlyRevenue?.toLocaleString() || '0'}</div>
            <div className="stat-label">This Month</div>
          </div>
        </div>
        <div className="stat-card pending">
          <div className="stat-icon">
            <i className="fas fa-clock"></i>
          </div>
          <div className="stat-content">
            <div className="stat-value">UGX {stats.pendingBalance?.toLocaleString() || '0'}</div>
            <div className="stat-label">Pending Balance</div>
          </div>
        </div>
        <div className="stat-card transactions">
          <div className="stat-icon">
            <i className="fas fa-receipt"></i>
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats.totalTransactions || 0}</div>
            <div className="stat-label">Total Transactions</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-section">
        <div className="search-box">
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Search payments..."
            value={filters.searchQuery}
            onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
            disabled={loading}
          />
        </div>
        
        <div className="filter-group">
          <label>Tenant:</label>
          <select
            value={filters.tenantId}
            onChange={(e) => handleFilterChange('tenantId', e.target.value)}
            disabled={loading}
          >
            <option value="all">All Tenants</option>
            {tenants.map(tenant => (
              <option key={tenant.id} value={tenant.id}>
                {tenant.name} (Room {tenant.roomNumber})
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Type:</label>
          <select
            value={filters.paymentType}
            onChange={(e) => handleFilterChange('paymentType', e.target.value)}
            disabled={loading}
          >
            <option value="all">All Types</option>
            <option value="full">Full Payment</option>
            <option value="partial">Partial Payment</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Period:</label>
          <select
            value={filters.dateRange}
            onChange={(e) => handleFilterChange('dateRange', e.target.value)}
            disabled={loading}
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="year">Last Year</option>
          </select>
        </div>
      </div>

      {/* Payments Table */}
      <div className="payments-container">
        <div className="table-container">
          <table className="payments-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Tenant</th>
                <th>Room</th>
                <th>Amount</th>
                <th>Type</th>
                <th>Method</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {payments.length > 0 ? (
                payments.map(payment => (
                  <tr key={payment.id} className="payment-row">
                    <td>
                      <div className="payment-date">
                        {new Date(payment.date).toLocaleDateString()}
                      </div>
                    </td>
                    <td>
                      <div className="tenant-info">
                        <div className="tenant-name">{payment.tenantName}</div>
                        <div className="tenant-contact">{payment.tenantPhone}</div>
                      </div>
                    </td>
                    <td>
                      <div className="room-info">
                        <span className="room-number">{payment.roomNumber}</span>
                        <span className="room-type">{payment.roomType}</span>
                      </div>
                    </td>
                    <td>
                      <div className="payment-amount">
                        UGX {payment.amount.toLocaleString()}
                      </div>
                    </td>
                    <td>
                      <span 
                        className="payment-type-badge"
                        style={{ backgroundColor: getPaymentTypeColor(payment.type) }}
                      >
                        {payment.type}
                      </span>
                    </td>
                    <td>
                      <span 
                        className="payment-method-badge"
                        style={{ backgroundColor: getPaymentMethodColor(payment.method) }}
                      >
                        {payment.method}
                      </span>
                    </td>
                    <td>
                      <div className="payment-notes">
                        {payment.notes || '-'}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="no-data">
                    <div className="no-payments">
                      <i className="fas fa-receipt"></i>
                      <h3>No payments found</h3>
                      <p>Try adjusting your search or filters</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {payments.length > 0 && (
          <div className="payments-summary">
            <div className="summary-item">
              <span className="summary-label">Total Displayed:</span>
              <span className="summary-value">
                UGX {payments.reduce((sum, payment) => sum + payment.amount, 0).toLocaleString()}
              </span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Transactions:</span>
              <span className="summary-value">{payments.length}</span>
            </div>
          </div>
        )}
      </div>

      {/* Add Payment Modal */}
      {showAddPaymentModal && (
        <AddPaymentModal
          tenants={tenants.filter(tenant => tenant.balance > 0)}
          onSave={handleAddPayment}
          onClose={() => setShowAddPaymentModal(false)}
          loading={loading}
        />
      )}
    </div>
  );
};

// Add Payment Modal Component
const AddPaymentModal = ({ tenants, onSave, onClose, loading }) => {
  const [formData, setFormData] = useState({
    tenantId: '',
    amount: '',
    method: 'cash',
    notes: ''
  });

  const [selectedTenant, setSelectedTenant] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.tenantId || !formData.amount || formData.amount <= 0) {
      alert('Please fill in all required fields');
      return;
    }

    const tenant = tenants.find(t => t.id === formData.tenantId);
    if (!tenant) {
      alert('Selected tenant not found');
      return;
    }

    if (parseInt(formData.amount) > tenant.balance) {
      alert('Payment amount cannot exceed outstanding balance');
      return;
    }

    const paymentData = {
      tenantId: formData.tenantId,
      roomId: tenant.roomId,
      amount: parseInt(formData.amount),
      method: formData.method,
      notes: formData.notes
    };

    onSave(paymentData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'tenantId') {
      const tenant = tenants.find(t => t.id === value);
      setSelectedTenant(tenant);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Record New Payment</h2>
          <button className="modal-close" onClick={onClose} disabled={loading}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="tenantId">Select Tenant *</label>
            <select
              id="tenantId"
              name="tenantId"
              value={formData.tenantId}
              onChange={handleChange}
              required
              disabled={loading || tenants.length === 0}
            >
              <option value="">Choose a tenant</option>
              {tenants.map(tenant => (
                <option key={tenant.id} value={tenant.id}>
                  {tenant.name} (Room {tenant.roomNumber}) - Balance: UGX {tenant.balance.toLocaleString()}
                </option>
              ))}
            </select>
            {tenants.length === 0 && (
              <small>No tenants with outstanding balance</small>
            )}
          </div>

          {selectedTenant && (
            <div className="tenant-payment-info">
              <div className="info-card">
                <div className="info-item">
                  <label>Current Balance:</label>
                  <span className="balance-amount">UGX {selectedTenant.balance.toLocaleString()}</span>
                </div>
                <div className="info-item">
                  <label>Room:</label>
                  <span>{selectedTenant.roomNumber} ({selectedTenant.roomType})</span>
                </div>
                <div className="info-item">
                  <label>Phone:</label>
                  <span>{selectedTenant.phone}</span>
                </div>
              </div>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="amount">Payment Amount (UGX) *</label>
            <input
              id="amount"
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Enter amount"
              min="1"
              max={selectedTenant ? selectedTenant.balance : ''}
              required
              disabled={loading}
            />
            {selectedTenant && (
              <small>Maximum: UGX {selectedTenant.balance.toLocaleString()}</small>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="method">Payment Method *</label>
            <select
              id="method"
              name="method"
              value={formData.method}
              onChange={handleChange}
              required
              disabled={loading}
            >
              <option value="cash">Cash</option>
              <option value="mobile money">Mobile Money</option>
              <option value="bank">Bank Transfer</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="notes">Notes</label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Any additional notes about this payment..."
              rows="3"
              disabled={loading}
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-outline" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading || !formData.tenantId}>
              {loading ? 'Processing...' : 'Record Payment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentsPage;