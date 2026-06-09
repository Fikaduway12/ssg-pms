import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ collapsed, mobileOpen, onClose }) => {
  const { user, logout } = useAuth();

  const menuItems = [
    { path: '/dashboard', icon: '📊', label: 'Dashboard', color: '#667eea' },
    { path: '/projects', icon: '🚀', label: 'Projects', color: '#48bb78' },
    { path: '/tasks', icon: '✅', label: 'Tasks', color: '#ed8936' },
    { path: '/team', icon: '👥', label: 'Team Members', color: '#4299e1' },
    { path: '/reports', icon: '📈', label: 'Reports', color: '#9f7aea' },
    { path: '/documents', icon: '📄', label: 'Documents', color: '#f687b3' },
    { path: '/calendar', icon: '📅', label: 'Calendar', color: '#fbbf24' },
    { path: '/settings', icon: '⚙️', label: 'Settings', color: '#a0aec0' },
  ];

  const getSidebarStyle = () => ({
    width: collapsed ? 80 : 260,
    height: '100vh',
    backgroundColor: '#ffffff',
    borderRight: '1px solid #e2e8f0',
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    left: 0,
    top: 0,
    transition: 'width 0.3s ease',
    zIndex: 1000,
    boxShadow: '2px 0 8px rgba(0,0,0,0.05)',
  });

  const sidebarContent = (
    <div style={getSidebarStyle()}>
      {/* Logo Section */}
      <div style={styles.logoSection}>
        <div style={styles.logo}>
          <span style={styles.logoIcon}>🛰️</span>
          {!collapsed && (
            <div style={styles.logoText}>
              <div>SSG INSTITUTE</div>
              <span style={styles.logoSubtext}>PMS</span>
            </div>
          )}
        </div>
        {!collapsed && <div style={styles.tagline}>FROM EARTH TO SPACE</div>}
      </div>

      {/* User Profile Section */}
      {!collapsed && (
        <div style={styles.userSection}>
          <div style={styles.avatar}>
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div style={styles.userInfo}>
            <div style={styles.userName}>{user?.name || 'Guest User'}</div>
            <div style={styles.userRole}>Research Scientist</div>
          </div>
        </div>
      )}

      {/* Navigation Menu */}
      <nav style={styles.nav}>
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            style={({ isActive }) => ({
              ...styles.navItem,
              backgroundColor: isActive ? 'rgba(102, 126, 234, 0.1)' : 'transparent',
              borderLeftColor: isActive ? item.color : 'transparent',
            })}
          >
            <span style={styles.navIcon}>{item.icon}</span>
            {!collapsed && <span style={styles.navLabel}>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Footer Section */}
      {!collapsed && (
        <div style={styles.footer}>
          <button onClick={() => logout()} style={styles.logoutButton}>
            <span>🚪</span>
            <span>Logout</span>
          </button>
          <div style={styles.version}>Version 2.0.0</div>
        </div>
      )}
    </div>
  );

  // Mobile drawer
  if (mobileOpen) {
    return (
      <>
        <div style={styles.overlay} onClick={onClose} />
        <div style={styles.mobileDrawer}>{sidebarContent}</div>
      </>
    );
  }

  return sidebarContent;
};

const styles = {
  sidebar: (collapsed) => ({
    width: collapsed ? 80 : 260,
    height: '100vh',
    backgroundColor: '#ffffff',
    borderRight: '1px solid #e2e8f0',
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    left: 0,
    top: 0,
    transition: 'width 0.3s ease',
    zIndex: 1000,
    boxShadow: '2px 0 8px rgba(0,0,0,0.05)',
  }),
  mobileDrawer: {
    width: 260,
    height: '100vh',
    backgroundColor: '#ffffff',
    position: 'fixed',
    left: 0,
    top: 0,
    zIndex: 1001,
    boxShadow: '2px 0 8px rgba(0,0,0,0.15)',
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1000,
  },
  logoSection: {
    padding: '24px 20px',
    borderBottom: '1px solid #e2e8f0',
    marginBottom: '20px',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '8px',
  },
  logoIcon: {
    fontSize: '32px',
  },
  logoText: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#2d3748',
    lineHeight: 1.3,
  },
  logoSubtext: {
    fontSize: '11px',
    color: '#667eea',
    fontWeight: 'normal',
  },
  tagline: {
    fontSize: '10px',
    color: '#a0aec0',
    fontStyle: 'italic',
  },
  userSection: {
    padding: '0 20px 20px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    borderBottom: '1px solid #e2e8f0',
    marginBottom: '20px',
  },
  avatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '18px',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#2d3748',
  },
  userRole: {
    fontSize: '11px',
    color: '#a0aec0',
  },
  nav: {
    flex: 1,
    padding: '0 12px',
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    marginBottom: '8px',
    borderRadius: '8px',
    textDecoration: 'none',
    transition: 'all 0.2s',
    borderLeft: '3px solid transparent',
  },
  navIcon: {
    fontSize: '20px',
  },
  navLabel: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#4a5568',
  },
  footer: {
    padding: '20px',
    borderTop: '1px solid #e2e8f0',
  },
  logoutButton: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#fef5f5',
    border: 'none',
    borderRadius: '8px',
    color: '#e53e3e',
    fontSize: '14px',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    marginBottom: '12px',
  },
  version: {
    fontSize: '11px',
    color: '#cbd5e0',
    textAlign: 'center',
  },
};

export default Sidebar;