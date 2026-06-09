import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

// --- ENTERPRISE COLOR PALETTE (Customize these values) ---
// Replace these with the actual colors from the SSGI website
const COLORS = {
  // Brand Colors - REPLACE THESE WITH SSGI's ACTUAL COLORS
  primary: '#0B3B5F',      // Example: A dark, authoritative blue
  primaryDark: '#06233E',   // Darker version for hover states
  primaryLight: '#E8F0F8',  // Very light version for backgrounds

  accent: '#D4AF37',       // Example: A gold/geospatial accent color
  accentDark: '#B8960C',

  // UI Colors
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',
  
  // Neutrals
  white: '#FFFFFF',
  gray50: '#F9FAFB',
  gray100: '#F3F4F6',
  gray200: '#E5E7EB',
  gray300: '#D1D5DB',
  gray400: '#9CA3AF',
  gray500: '#6B7280',
  gray600: '#4B5563',
  gray700: '#374151',
  gray800: '#1F2937',
  gray900: '#111827',
  black: '#000000',
};

// --- ENTERPRISE STYLESHEET (Using the dynamic color palette) ---
const createStyles = (colors: typeof COLORS) => ({
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column' as const,
    backgroundColor: colors.gray50,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  header: {
    backgroundColor: colors.white,
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    position: 'sticky' as const,
    top: 0,
    zIndex: 1000,
    borderBottom: `3px solid ${colors.accent}`,
  },
  headerContent: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0.75rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap' as const,
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    fontSize: '1.5rem',
    fontWeight: 700,
    color: colors.primary,
  },
  logoIcon: {
    fontSize: '2rem',
  },
  logoText: {
    fontSize: '1.25rem',
    letterSpacing: '-0.025em',
  },
  logoSubtext: {
    fontSize: '0.7rem',
    fontWeight: 400,
    color: colors.gray500,
    marginTop: '0.25rem',
  },
  nav: {
    display: 'flex',
    gap: '2rem',
    alignItems: 'center',
  },
  navLink: {
    color: colors.gray600,
    textDecoration: 'none',
    fontSize: '0.9rem',
    fontWeight: 500,
    transition: 'color 0.2s',
    padding: '0.5rem 0',
    borderBottom: `2px solid transparent`,
  },
  main: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
  },
  loginCard: {
    backgroundColor: colors.white,
    borderRadius: '1rem',
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.02)',
    padding: '2.5rem',
    width: '100%',
    maxWidth: '450px',
  },
  loginHeader: {
    textAlign: 'center' as const,
    marginBottom: '2rem',
  },
  title: {
    fontSize: '1.875rem',
    fontWeight: 700,
    color: colors.gray900,
    marginBottom: '0.5rem',
  },
  subtitle: {
    color: colors.gray500,
    fontSize: '0.875rem',
  },
  errorAlert: {
    backgroundColor: colors.error + '10', // 10% opacity
    border: `1px solid ${colors.error}30`,
    borderRadius: '0.5rem',
    padding: '0.75rem',
    marginBottom: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: colors.error,
    fontSize: '0.875rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1.25rem',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.5rem',
  },
  label: {
    fontSize: '0.875rem',
    fontWeight: 500,
    color: colors.gray700,
  },
  input: {
    padding: '0.625rem 0.75rem',
    border: `1px solid ${colors.gray300}`,
    borderRadius: '0.5rem',
    fontSize: '0.875rem',
    transition: 'all 0.2s',
    outline: 'none',
    ':focus': {
      borderColor: colors.primary,
      ring: `3px solid ${colors.primary}20`,
    },
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
    color: colors.gray600,
    cursor: 'pointer',
  },
  forgotPassword: {
    color: colors.primary,
    textDecoration: 'none',
    fontSize: '0.875rem',
    fontWeight: 500,
  },
  button: {
    backgroundColor: colors.primary,
    color: colors.white,
    border: 'none',
    padding: '0.75rem',
    borderRadius: '0.5rem',
    fontSize: '0.875rem',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'background-color 0.2s, transform 0.1s',
    marginTop: '0.5rem',
    width: '100%',
  },
  buttonDisabled: {
    backgroundColor: colors.gray400,
    cursor: 'not-allowed',
  },
  signupPrompt: {
    textAlign: 'center' as const,
    marginTop: '1.5rem',
    fontSize: '0.875rem',
    color: colors.gray600,
  },
  signupLink: {
    color: colors.primary,
    textDecoration: 'none',
    fontWeight: 500,
  },
  footer: {
    backgroundColor: colors.gray900,
    color: colors.gray400,
    marginTop: 'auto',
    borderTop: `1px solid ${colors.gray800}`,
  },
  footerContent: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '3rem 2rem',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
  },
  // ... (keep the rest of the footer styles as they are, using the colors object)
  footerLink: {
    color: colors.gray400,
    textDecoration: 'none',
    fontSize: '0.875rem',
    lineHeight: '2',
    transition: 'color 0.2s',
  },
  // ... add hover states using the colors object
});

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const { login, loading, error } = useAuth();
  const styles = React.useMemo(() => createStyles(COLORS), []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div style={styles.container}>
      {/* Header - Updated with SSGI style */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.logo}>
            <span style={styles.logoIcon}>🛰️</span>
            <div>
              <div style={styles.logoText}>SSG Institute</div>
              <div style={styles.logoSubtext}>Space Science & Geospatial</div>
            </div>
          </div>
          <nav style={styles.nav}>
            <a href="#" style={styles.navLink}>Home</a>
            <a href="#" style={styles.navLink}>About</a>
            <a href="#" style={styles.navLink}>Contact</a>
            <a href="#" style={styles.navLink}>Support</a>
          </nav>
        </div>
      </header>

      <main style={styles.main}>
        <div style={styles.loginCard}>
          <div style={styles.loginHeader}>
            <h1 style={styles.title}>Welcome Back</h1>
            <p style={styles.subtitle}>Sign in to your account to continue</p>
          </div>

          {error && (
            <div style={styles.errorAlert}>
              <span>⚠️</span>
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
                placeholder="name@ssgi.gov.et"
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
                  style={{ width: '16px', height: '16px' }}
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
              {loading ? 'Signing in...' : 'Sign In'}
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

      {/* Footer - Include SSGI copyright */}
      <footer style={styles.footer}>
        {/* ... footer content ... */}
        <div style={styles.footerBottom}>
          <p>&copy; {new Date().getFullYear()} Space Science and Geospatial Institute (SSGI). All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}