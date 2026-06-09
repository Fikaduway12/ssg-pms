import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('accessToken');
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setAccessToken(storedToken);
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:8000/api/users/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      localStorage.setItem('accessToken', data.access);
      localStorage.setItem('refreshToken', data.refresh);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      setUser(data.user);
      setAccessToken(data.access);
      setLoading(false);
      return data;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  const logout = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        await fetch('http://localhost:8000/api/users/logout/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ refresh_token: refreshToken }),
        });
      }
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      setUser(null);
      setAccessToken(null);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:8000/api/users/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(JSON.stringify(data));
      }

      localStorage.setItem('accessToken', data.access);
      localStorage.setItem('refreshToken', data.refresh);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      setUser(data.user);
      setAccessToken(data.access);
      setLoading(false);
      return data;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  const changePassword = async (oldPassword, newPassword, confirmPassword) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:8000/api/users/change_password/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ old_password: oldPassword, new_password: newPassword, confirm_password: confirmPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Password change failed');
      }

      setLoading(false);
      return data;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  const hasRole = (roles) => {
    if (!user) return false;
    if (typeof roles === 'string') return user.role === roles;
    return roles.includes(user.role);
  };

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    register,
    changePassword,
    hasRole,
    isAuthenticated: !!user,
    isSuperAdmin: user?.role === 'SUPERADMIN',
    isDirector: user?.role === 'DG' || user?.role === 'DDG',
    canManageUsers: user?.can_manage_users || false,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;