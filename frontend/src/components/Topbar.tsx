import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Topbar = ({ onMenuClick }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const notifications = [
    { id: 1, title: 'Project deadline approaching', time: '5 min ago', type: 'warning' },
    { id: 2, title: 'New task assigned to you', time: '1 hour ago', type: 'info' },
    { id: 3, title: 'Team meeting in 30 minutes', time: '2 hours ago', type: 'success' },
  ];

  return (
    <header style={styles.header}>
      <div style={styles.headerLeft}>
        <button onClick={onMenuClick} style={styles.menuButton}>
          ☰
        </button>
        <div style={styles.pageTitle}>
          <h2>Dashboard</h2>
        </div>
      </div>

      <div style={styles.headerRight}>
        {/* Search Bar */}
        <div style={styles.searchBar}>
          <span>🔍</span>
          <input type="text" placeholder="Search..." style={styles.searchInput} />
        </div>

        {/* Notifications */}
        <div style={styles.iconContainer}>
          <button 
            onClick={() => setShowNotifications(!showNotifications)} 
            style={styles.iconButton}
          >
            🔔
            <span style={styles.badge}>3</span>
          </button>
          {showNotifications && (
            <div style={styles.dropdown}>
              <div style={styles.dropdownHeader}>
                <h4>Notifications</h4>
                <button style={styles.markAllRead}>Mark all read</button>
              </div>
              {notifications.map(notif => (
                <div key={notif.id} style={styles.notificationItem}>
                  <div style={styles.notificationContent}>
                    <div style={styles.notificationTitle}>{notif.title}</div>
                    <div style={styles.notificationTime}>{notif.time}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* User Menu */}
        <div style={styles.iconContainer}>
          <button 
            onClick={() => setShowUserMenu(!showUserMenu)} 
            style={styles.userButton}
          >
            <div style={styles.userAvatar}>
              {user?.name?.charAt(0) || 'U'}
            </div>
          </button>
          {showUserMenu && (
            <div style={styles.userDropdown}>
              <div style={styles.userDropdownHeader}>
                <div style={styles.userDropdownAvatar}>
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <div>
                  <div style={styles.userDropdownName}>{user?.name || 'Guest User'}</div>
                  <div style={styles.userDropdownEmail}>{user?.email || 'user@ssgi.gov.et'}</div>
                </div>
              </div>
              <div style={styles.dropdownDivider} />
              <button onClick={() => navigate('/profile')} style={styles.dropdownItem}>
                👤 Profile Settings
              </button>
              <button onClick={() => navigate('/settings')} style={styles.dropdownItem}>
                ⚙️ Account Settings
              </button>
              <button onClick={() => navigate('/help')} style={styles.dropdownItem}>
                ❓ Help & Support
              </button>
              <div style={styles.dropdownDivider} />
              <button onClick={() => logout()} style={{...styles.dropdownItem, color: '#e53e3e'}}>
                🚪 Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

const styles = {
  header: {
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #e2e8f0',
    padding: '0 24px',
    height: '64px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'sticky',
    top: 0,
    zIndex: 999,
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  menuButton: {
    background: 'none',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
    padding: '8px',
    borderRadius: '8px',
    transition: 'background 0.2s',
  },
  pageTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#2d3748',
    margin: 0,
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  searchBar: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: '#f7fafc',
    padding: '8px 16px',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
  },
  searchInput: {
    border: 'none',
    background: 'none',
    outline: 'none',
    fontSize: '14px',
    width: '200px',
  },
  iconContainer: {
    position: 'relative',
  },
  iconButton: {
    background: 'none',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
    padding: '8px',
    borderRadius: '8px',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: '4px',
    right: '4px',
    backgroundColor: '#e53e3e',
    color: 'white',
    fontSize: '10px',
    padding: '2px 5px',
    borderRadius: '10px',
  },
  dropdown: {
    position: 'absolute',
    top: '40px',
    right: 0,
    width: '320px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
    zIndex: 1000,
    overflow: 'hidden',
  },
  dropdownHeader: {
    padding: '16px',
    borderBottom: '1px solid #e2e8f0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  markAllRead: {
    background: 'none',
    border: 'none',
    color: '#667eea',
    fontSize: '12px',
    cursor: 'pointer',
  },
  notificationItem: {
    padding: '12px 16px',
    borderBottom: '1px solid #f0f0f0',
    cursor: 'pointer',
    transition: 'background 0.2s',
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: '14px',
    fontWeight: '500',
    marginBottom: '4px',
  },
  notificationTime: {
    fontSize: '11px',
    color: '#a0aec0',
  },
  userButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
  },
  userAvatar: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '16px',
  },
  userDropdown: {
    position: 'absolute',
    top: '40px',
    right: 0,
    width: '280px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
    zIndex: 1000,
    overflow: 'hidden',
  },
  userDropdownHeader: {
    padding: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  userDropdownAvatar: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '20px',
  },
  userDropdownName: {
    fontSize: '14px',
    fontWeight: '600',
    marginBottom: '4px',
  },
  userDropdownEmail: {
    fontSize: '12px',
    color: '#a0aec0',
  },
  dropdownDivider: {
    height: '1px',
    backgroundColor: '#e2e8f0',
    margin: '8px 0',
  },
  dropdownItem: {
    width: '100%',
    padding: '10px 16px',
    background: 'none',
    border: 'none',
    textAlign: 'left',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'background 0.2s',
  },
};

export default Topbar;