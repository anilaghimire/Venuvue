import React, { useState, useEffect } from 'react';

// Static example logs
const staticLogs = [
  {
    date: '2024-08-17T10:00:00Z',
    user: 'admin',
    action: 'User Login',
    details: "User 'admin' logged in successfully."
  },
  {
    date: '2024-08-17T10:15:00Z',
    user: 'admin',
    action: 'Created Product',
    details: "Product 'Laptop' created by 'admin'."
  },
  {
    date: '2024-08-17T10:30:00Z',
    user: 'admin',
    action: 'Updated Product',
    details: "Product 'Laptop' price updated by 'admin'."
  },
  {
    date: '2024-08-17T11:00:00Z',
    user: 'Anila ghimire',
    action: 'Save Item',
    details: "Order ID 'ORD001' placed by 'user123'."
  },
  {
    date: '2024-08-17T11:45:00Z',
    user: 'Anila Ghimire',
    action: 'Logged Out',
    details: "User 'user123' logged out."
  }
];

const AuditTrail = () => {
  const [auditLogs, setAuditLogs] = useState(staticLogs); // Use static data
  const [loading, setLoading] = useState(false); // Set to false for static data
  const [error, setError] = useState('');

  useEffect(() => {
    // Simulate data fetch
    setLoading(true);
    setTimeout(() => {
      setAuditLogs(staticLogs);
      setLoading(false);
    }, 500); // Simulate a delay
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="audit-trail">
      <h1>Audit Trail</h1>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead className="table-dark">
            <tr>
              <th>Date</th>
              <th>User</th>
              <th>Action</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {auditLogs.length === 0 ? (
              <tr>
                <td colSpan="4">No logs available</td>
              </tr>
            ) : (
              auditLogs.map((log, index) => (
                <tr key={index}>
                  <td>{new Date(log.date).toLocaleString()}</td>
                  <td>{log.user}</td>
                  <td>{log.action}</td>
                  <td>{log.details}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuditTrail;