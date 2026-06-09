import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const { login, loading, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.logo}>
            <span style={styles.logoIcon}>📊</span>
            <span style={styles.logoText}>SSG PMS</span>
          </div>
          <nav style={styles.nav}>
            <a href="#" style={styles.navLink}>Home</a>
            <a href="#" style={styles.navLink}>About</a>
            <a href="#" style={styles.navLink}>Contact</a>
            <a href="#" style={styles.navLink}>Support</a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main style={styles.main}>
        <div style={styles.loginCard}>
          <div style={styles.loginHeader}>
            <h1 style={styles.title}>Welcome Back</h1>
            <p style={styles.subtitle}>Sign in to your account to continue</p>
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
                placeholder="admin@example.com"
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
              Create an account
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <div style={styles.footerSection}>
            <h4 style={styles.footerTitle}>SSG PMS</h4>
            <p style={styles.footerText}>
              Professional Project Management System<br />
              Streamline your workflows and boost productivity
            </p>
          </div>
          <div style={styles.footerSection}>
            <h4 style={styles.footerTitle}>Quick Links</h4>
            <ul style={styles.footerLinks}>
              <li><a href="#" style={styles.footerLink}>About Us</a></li>
              <li><a href="#" style={styles.footerLink}>Features</a></li>
              <li><a href="#" style={styles.footerLink}>Pricing</a></li>
              <li><a href="#" style={styles.footerLink}>FAQ</a></li>
            </ul>
          </div>
          <div style={styles.footerSection}>
            <h4 style={styles.footerTitle}>Legal</h4>
            <ul style={styles.footerLinks}>
              <li><a href="#" style={styles.footerLink}>Privacy Policy</a></li>
              <li><a href="#" style={styles.footerLink}>Terms of Service</a></li>
              <li><a href="#" style={styles.footerLink}>Cookie Policy</a></li>
            </ul>
          </div>
          <div style={styles.footerSection}>
            <h4 style={styles.footerTitle}>Contact</h4>
            <ul style={styles.footerLinks}>
              <li><a href="#" style={styles.footerLink}>support@ssgpms.com</a></li>
              <li><a href="#" style={styles.footerLink}>+1 (555) 123-4567</a></li>
              <li><a href="#" style={styles.footerLink}>Live Chat</a></li>
            </ul>
          </div>
        </div>
        <div style={styles.footerBottom}>
          <p>&copy; 2024 SSG PMS. All rights reserved.</p>
          <div style={styles.socialLinks}>
            <a href="#" style={styles.socialLink}>📘</a>
            <a href="#" style={styles.socialLink}>🐦</a>
            <a href="#" style={styles.socialLink}>💼</a>
            <a href="#" style={styles.socialLink}>📷</a>
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
    backgroundColor: '#f5f5f5',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  header: {
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  headerContent: {
    maxWidth: '1200px',
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
    gap: '0.5rem',
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  logoIcon: {
    fontSize: '1.8rem',
  },
  logoText: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  nav: {
    display: 'flex',
    gap: '2rem',
  },
  navLink: {
    color: '#666',
    textDecoration: 'none',
    transition: 'color 0.3s',
    fontSize: '1rem',
  },
  main: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
  },
  loginCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
    padding: '2.5rem',
    width: '100%',
    maxWidth: '450px',
    animation: 'fadeIn 0.5s ease-in-out',
  },
  loginHeader: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  title: {
    fontSize: '1.75rem',
    fontWeight: '600',
    color: '#333',
    marginBottom: '0.5rem',
  },
  subtitle: {
    color: '#666',
    fontSize: '0.9rem',
  },
  errorAlert: {
    backgroundColor: '#fee',
    border: '1px solid #fcc',
    borderRadius: '8px',
    padding: '0.75rem',
    marginBottom: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: '#c33',
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
    fontSize: '0.9rem',
    fontWeight: '500',
    color: '#555',
  },
  input: {
    padding: '0.75rem',
    border: '2px solid #e0e0e0',
    borderRadius: '8px',
    fontSize: '1rem',
    transition: 'border-color 0.3s',
    outline: 'none',
  },
  options: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '0.9rem',
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: '#666',
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
    fontSize: '0.9rem',
  },
  button: {
    backgroundColor: '#667eea',
    color: 'white',
    border: 'none',
    padding: '0.875rem',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s, transform 0.2s',
    marginTop: '0.5rem',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
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
    fontSize: '0.9rem',
    color: '#666',
  },
  signupLink: {
    color: '#667eea',
    textDecoration: 'none',
    fontWeight: '500',
  },
  footer: {
    backgroundColor: '#2d3748',
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
    fontSize: '1.1rem',
    fontWeight: '600',
    marginBottom: '0.5rem',
  },
  footerText: {
    fontSize: '0.9rem',
    lineHeight: '1.5',
    color: '#cbd5e0',
  },
  footerLinks: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  footerLink: {
    color: '#cbd5e0',
    textDecoration: 'none',
    fontSize: '0.9rem',
    lineHeight: '2',
    transition: 'color 0.3s',
  },
  footerBottom: {
    borderTop: '1px solid #4a5568',
    padding: '1.5rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1rem',
    fontSize: '0.85rem',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  socialLinks: {
    display: 'flex',
    gap: '1rem',
  },
  socialLink: {
    color: '#cbd5e0',
    textDecoration: 'none',
    fontSize: '1.2rem',
    transition: 'color 0.3s',
  },
};

// Add CSS animations to the document
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
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
  
  button:hover:not(:disabled) {
    background-color: #5a67d8;
    transform: translateY(-1px);
  }
  
  a:hover {
    color: #667eea !important;
  }
`;
document.head.appendChild(styleSheet);