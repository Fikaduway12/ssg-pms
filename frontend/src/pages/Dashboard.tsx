import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div style={{ padding: '20px' }}>
      <h1>Dashboard</h1>
      <p>Welcome, {user?.name || user?.email || 'User'}!</p>
      <button 
        onClick={logout} 
        style={{ padding: '10px 20px', marginTop: '20px', cursor: 'pointer' }}
      >
        Logout
      </button>
    </div>
  );
}
