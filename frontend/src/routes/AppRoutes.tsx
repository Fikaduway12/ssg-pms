import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import MainLayout from '../layouts/MainLayout';

// Lazy load components
const Login = lazy(() => import('../pages/Login'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Projects = lazy(() => import('../pages/Projects'));
const Tasks = lazy(() => import('../pages/Tasks'));
const Team = lazy(() => import('../pages/Team'));
const Reports = lazy(() => import('../pages/Reports'));
const Documents = lazy(() => import('../pages/Documents'));
const Calendar = lazy(() => import('../pages/Calendar'));
const Settings = lazy(() => import('../pages/Settings'));
const NotFound = lazy(() => import('../pages/NotFound'));

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}

export default function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Suspense fallback={<div style={styles.loading}>Loading...</div>}>
      <Routes>
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" replace />} />
        
        {/* Protected routes with MainLayout */}
        <Route path="/" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="projects" element={<Projects />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="team" element={<Team />} />
          <Route path="reports" element={<Reports />} />
          <Route path="documents" element={<Documents />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

const styles = {
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontSize: '18px',
    color: '#667eea',
  },
};