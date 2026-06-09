import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const { login, loading, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  // Rotate background images for dynamic feel
  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundIndex((prev) => (prev + 1) % 3);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const backgrounds = [
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80', // Space
    'https://images.unsplash.com/photo-1536697246787-1f7ae568d89a?auto=format&fit=crop&w=1920&q=80', // Earth
    'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1920&q=80', // Galaxy
  ];

  return (
    <div style={styles.container}>
      {/* Dynamic Background */}
      <div style={{
        ...styles.background,
        backgroundImage: `url(${backgrounds[backgroundIndex]})`
      }}>
        <div style={styles.overlay}></div>
      </div>

      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.logo}>
            <div style={styles.logoIcon}>
              <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="45" stroke="url(#gradient)" strokeWidth="2" fill="none"/>
                <path d="M50 5 L50 95 M5 50 L95 50" stroke="url(#gradient)" strokeWidth="1" opacity="0.3"/>
                <circle cx="50" cy="50" r="15" fill="url(#gradient)"/>
                <path d="M50 35 L50 65 M35 50 L65 50" stroke="white" strokeWidth="2"/>
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#667eea"/>
                    <stop offset="100%" stopColor="#764ba2"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div style={styles.logoText}>
              <div style={styles.logoTitle}>SPACE SCIENCE AND</div>
              <div style={styles.logoSubtitle}>GEOSPATIAL INSTITUTE</div>
              <div style={styles.tagline}>FROM EARTH TO SPACE</div>
            </div>
          </div>
          <nav style={styles.nav}>
            <a href="#" style={styles.navLink}>Home</a>
            <a href="#" style={styles.navLink}>About</a>
            <a href="#" style={styles.navLink}>Research</a>
            <a href="#" style={styles.navLink}>Contact</a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main style={styles.main}>
        <div style={styles.loginWrapper}>
          <div style={styles.loginCard}>
            <div style={styles.loginHeader}>
              <h1 style={styles.title}>Welcome Back</h1>
              <p style={styles.subtitle}>Access the SSGI Project Management System</p>
            </div>

            {error && (
              <div style={styles.errorAlert}>
                <span style={styles.errorIcon}>⚠️</span>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.inputGroup}>
                <label htmlFor="email" style={styles.label}>
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="researcher@ssgi.gov.et"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={styles.input}
                />
              </div>

              <div style={styles.inputGroup}>
                <label htmlFor="password" style={styles.label}>
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={styles.input}
                />
              </div>

              <div style={styles.options}>
                <label style={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    style={styles.checkbox}
                  />
                  Remember me
                </label>
                <a href="#" style={styles.forgotPassword}>
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                disabled={loading}
                style={loading ? { ...styles.button, ...styles.buttonDisabled } : styles.button}
              >
                {loading ? (
                  <span style={styles.loadingSpinner}>
                    <span style={styles.spinner}></span>
                    Signing in...
                  </span>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            <div style={styles.signupPrompt}>
              Don't have an account?{' '}
              <a href="#" style={styles.signupLink}>
                Request Access
              </a>
            </div>

            <div style={styles.securityNote}>
              <span style={styles.securityIcon}>🔒</span>
              <span>Secure login powered by SSGI authentication</span>
            </div>
          </div>

          {/* Info Panel */}
          <div style={styles.infoPanel}>
            <div style={styles.infoContent}>
              <h3 style={styles.infoTitle}>SSGI Project Management System</h3>
              <p style={styles.infoText}>
                Streamline your space science and geospatial research projects with our 
                integrated management platform. Track progress, collaborate with teams, 
                and access real-time analytics.
              </p>
              <div style={styles.features}>
                <div style={styles.feature}>
                  <span>🚀</span>
                  <span>Project Tracking</span>
                </div>
                <div style={styles.feature}>
                  <span>🛰️</span>
                  <span>Geospatial Analytics</span>
                </div>
                <div style={styles.feature}>
                  <span>🌍</span>
                  <span>Earth Observation</span>
                </div>
                <div style={styles.feature}>
                  <span>📊</span>
                  <span>Research Management</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <div style={styles.footerSection}>
            <h4 style={styles.footerTitle}>Space Science and Geospatial Institute</h4>
            <p style={styles.footerText}>
              Advancing space science and geospatial technology for sustainable development
            </p>
            <p style={styles.footerText}>
              <strong>FROM EARTH TO SPACE</strong>
            </p>
          </div>
          <div style={styles.footerSection}>
            <h4 style={styles.footerTitle}>Quick Links</h4>
            <ul style={styles.footerLinks}>
              <li><a href="#" style={styles.footerLink}>About SSGI</a></li>
              <li><a href="#" style={styles.footerLink}>Research Programs</a></li>
              <li><a href="#" style={styles.footerLink}>Publications</a></li>
              <li><a href="#" style={styles.footerLink}>Careers</a></li>
            </ul>
          </div>
          <div style={styles.footerSection}>
            <h4 style={styles.footerTitle}>Resources</h4>
            <ul style={styles.footerLinks}>
              <li><a href="#" style={styles.footerLink}>Data Portal</a></li>
              <li><a href="#" style={styles.footerLink}>Documentation</a></li>
              <li><a href="#" style={styles.footerLink}>API Access</a></li>
              <li><a href="#" style={styles.footerLink}>Support Center</a></li>
            </ul>
          </div>
          <div style={styles.footerSection}>
            <h4 style={styles.footerTitle}>Connect</h4>
            <ul style={styles.footerLinks}>
              <li><a href="#" style={styles.footerLink}>contact@ssgi.gov.et</a></li>
              <li><a href="#" style={styles.footerLink}>+251-11-123-4567</a></li>
              <li><a href="#" style={styles.footerLink}>Addis Ababa, Ethiopia</a></li>
            </ul>
            <div style={styles.socialLinks}>
              <a href="#" style={styles.socialLink}>📘</a>
              <a href="#" style={styles.socialLink}>🐦</a>
              <a href="#" style={styles.socialLink}>💼</a>
              <a href="#" style={styles.socialLink}>📷</a>
            </div>
          </div>
        </div>
        <div style={styles.footerBottom}>
          <p>&copy; 2024 Space Science and Geospatial Institute. All rights reserved.</p>
          <div style={styles.footerLinks}>
            <a href="#" style={styles.footerBottomLink}>Privacy Policy</a>
            <a href="#" style={styles.footerBottomLink}>Terms of Use</a>
            <a href="#" style={styles.footerBottomLink}>Cookie Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    position: 'relative',
  },
  background: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    transition: 'background-image 1s ease-in-out',
    zIndex: -2,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.95) 0%, rgba(118, 75, 162, 0.95) 100%)',
    zIndex: -1,
  },
  header: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 2px 20px rgba(0,0,0,0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  headerContent: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '1rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  logoIcon: {
    fontSize: '1.8rem',
  },
  logoText: {
    lineHeight: 1.2,
  },
  logoTitle: {
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#2d3748',
    letterSpacing: '1px',
  },
  logoSubtitle: {
    fontSize: '1.1rem',
    fontWeight: '700',
    color: '#667eea',
    letterSpacing: '0.5px',
  },
  tagline: {
    fontSize: '0.7rem',
    color: '#718096',
    fontStyle: 'italic',
  },
  nav: {
    display: 'flex',
    gap: '2rem',
  },
  navLink: {
    color: '#4a5568',
    textDecoration: 'none',
    fontSize: '0.9rem',
    fontWeight: '500',
    transition: 'color 0.3s',
    padding: '0.5rem 0',
    borderBottom: '2px solid transparent',
  },
  main: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
  },
  loginWrapper: {
    maxWidth: '1200px',
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '2rem',
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
    backdropFilter: 'blur(10px)',
  },
  loginCard: {
    padding: '3rem',
    backgroundColor: 'white',
  },
  loginHeader: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  title: {
    fontSize: '2rem',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginBottom: '0.5rem',
  },
  subtitle: {
    color: '#718096',
    fontSize: '0.9rem',
  },
  errorAlert: {
    backgroundColor: '#fed7d7',
    border: '1px solid #feb2b2',
    borderRadius: '10px',
    padding: '0.75rem',
    marginBottom: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: '#c53030',
    fontSize: '0.9rem',
  },
  errorIcon: {
    fontSize: '1.1rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  label: {
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#4a5568',
  },
  input: {
    padding: '0.75rem',
    border: '2px solid #e2e8f0',
    borderRadius: '10px',
    fontSize: '0.9rem',
    transition: 'all 0.3s',
    outline: 'none',
  },
  options: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '0.875rem',
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: '#4a5568',
    cursor: 'pointer',
  },
  checkbox: {
    width: '16px',
    height: '16px',
    cursor: 'pointer',
  },
  forgotPassword: {
    color: '#667eea',
    textDecoration: 'none',
    fontSize: '0.875rem',
    fontWeight: '500',
  },
  button: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    padding: '0.875rem',
    borderRadius: '10px',
    fontSize: '0.9rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
    marginTop: '0.5rem',
  },
  buttonDisabled: {
    opacity: 0.6,
    cursor: 'not-allowed',
  },
  loadingSpinner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
  },
  spinner: {
    width: '18px',
    height: '18px',
    border: '2px solid white',
    borderTopColor: 'transparent',
    borderRadius: '50%',
    display: 'inline-block',
    animation: 'spin 0.6s linear infinite',
  },
  signupPrompt: {
    textAlign: 'center',
    marginTop: '1.5rem',
    fontSize: '0.875rem',
    color: '#718096',
  },
  signupLink: {
    color: '#667eea',
    textDecoration: 'none',
    fontWeight: '600',
  },
  securityNote: {
    marginTop: '2rem',
    paddingTop: '1rem',
    borderTop: '1px solid #e2e8f0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    fontSize: '0.75rem',
    color: '#a0aec0',
  },
  securityIcon: {
    fontSize: '1rem',
  },
  infoPanel: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '3rem',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
  },
  infoContent: {
    textAlign: 'center',
  },
  infoTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    marginBottom: '1rem',
  },
  infoText: {
    fontSize: '0.9rem',
    lineHeight: '1.6',
    marginBottom: '2rem',
    opacity: 0.95,
  },
  features: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
    marginTop: '2rem',
  },
  feature: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.85rem',
    padding: '0.5rem',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
  },
  footer: {
    backgroundColor: '#1a202c',
    color: '#cbd5e0',
    marginTop: 'auto',
  },
  footerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '3rem 2rem',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
  },
  footerSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  footerTitle: {
    color: 'white',
    fontSize: '1rem',
    fontWeight: '600',
    marginBottom: '0.5rem',
  },
  footerText: {
    fontSize: '0.85rem',
    lineHeight: '1.5',
    color: '#a0aec0',
  },
  footerLinks: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  footerLink: {
    color: '#a0aec0',
    textDecoration: 'none',
    fontSize: '0.85rem',
    lineHeight: '2',
    transition: 'color 0.3s',
  },
  footerBottom: {
    borderTop: '1px solid #2d3748',
    padding: '1.5rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1rem',
    fontSize: '0.8rem',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  footerBottomLink: {
    color: '#a0aec0',
    textDecoration: 'none',
    marginLeft: '1rem',
  },
  socialLinks: {
    display: 'flex',
    gap: '1rem',
    marginTop: '0.5rem',
  },
  socialLink: {
    color: '#a0aec0',
    textDecoration: 'none',
    fontSize: '1.2rem',
    transition: 'color 0.3s',
  },
};

// Add CSS animations
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
  
  input:focus {
    border-color: #667eea !important;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1) !important;
  }
  
  button:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.2);
  }
  
  a:hover {
    color: #667eea !important;
  }
  
  @media (max-width: 768px) {
    .login-wrapper {
      grid-template-columns: 1fr !important;
    }
    
    .info-panel {
      display: none !important;
    }
  }
`;
document.head.appendChild(styleSheet);