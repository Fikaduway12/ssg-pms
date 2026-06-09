import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

export default function MainLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const location = useLocation();

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
      if (width >= 768) {
        setMobileOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    if (windowWidth < 768) {
      setMobileOpen(!mobileOpen);
    } else {
      setSidebarCollapsed(!sidebarCollapsed);
    }
  };

  return (
    <div style={styles.container}>
      <Sidebar 
        collapsed={sidebarCollapsed} 
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
      
      <div style={{
        ...styles.mainContent,
        marginLeft: windowWidth < 768 ? 0 : (sidebarCollapsed ? 80 : 260),
      }}>
        <Topbar onMenuClick={toggleSidebar} />
        <main style={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#f5f7fa',
  },
  mainContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    transition: 'margin-left 0.3s ease',
  },
  content: {
    flex: 1,
    padding: '24px',
    overflowY: 'auto',
  },
};