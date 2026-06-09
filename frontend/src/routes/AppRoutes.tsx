import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Lazy load components for better performance
const Login = React.lazy(() => import('../pages/Login'));
const Dashboard = React.lazy(() => import('../pages/Dashboard'));
const Users = React.lazy(() => import('../pages/Users'));
const Tasks = React.lazy(() => import('../pages/Tasks'));
const Reports = React.lazy(() => import('../pages/Reports'));
const NotFound = React.lazy(() => import('../pages/NotFound'));

// Protected Route wrapper component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* Public routes */}
        <Route 
          path="/login" 
          element={
            !isAuthenticated ? <Login /> : <Navigate to="/dashboard" replace />
          } 
        />
        
        {/* Protected routes */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/users" 
          element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/tasks" 
          element={
            <ProtectedRoute>
              <Tasks />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/reports" 
          element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          } 
        />
        
        {/* Redirect root to dashboard or login */}
        <Route 
          path="/" 
          element={
            isAuthenticated ? 
            <Navigate to="/dashboard" replace /> : 
            <Navigate to="/login" replace />
          } 
        />
        
        {/* 404 route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </React.Suspense>
  );
};

export default AppRoutes;