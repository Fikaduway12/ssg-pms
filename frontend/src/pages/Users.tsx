import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const { accessToken, canManageUsers } = useAuth();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    role: 'STAFF',
    phone: '',
    department: '',
    password: '',
    confirm_password: '',
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/users/', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      const data = await response.json();
      setUsers(data.results || data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingUser 
        ? `http://localhost:8000/api/users/${editingUser.id}/`
        : 'http://localhost:8000/api/users/register/';
      
      const method = editingUser ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchUsers();
        setShowModal(false);
        resetForm();
      } else {
        const error = await response.json();
        alert(JSON.stringify(error));
      }
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const response = await fetch(`http://localhost:8000/api/users/${userId}/`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
        
        if (response.ok) {
          fetchUsers();
        }
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const handleToggleActive = async (userId, currentStatus) => {
    try {
      const response = await fetch(`http://localhost:8000/api/users/${userId}/toggle_active/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      
      if (response.ok) {
        fetchUsers();
      }
    } catch (error) {
      console.error('Error toggling user status:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      username: '',
      email: '',
      first_name: '',
      last_name: '',
      role: 'STAFF',
      phone: '',
      department: '',
      password: '',
      confirm_password: '',
    });
    setEditingUser(null);
  };

  const roles = [
    { value: 'SUPERADMIN', label: 'Super Admin' },
    { value: 'DG', label: 'Director General' },
    { value: 'DDG', label: 'Deputy Director General' },
    { value: 'DIVISION_HEAD', label: 'Division Head' },
    { value: 'RESEARCH_SCIENTIST', label: 'Research Scientist' },
    { value: 'GIS_SPECIALIST', label: 'GIS Specialist' },
    { value: 'DATA_ANALYST', label: 'Data Analyst' },
    { value: 'LEGAL_OFFICER', label: 'Legal Officer' },
    { value: 'ADMIN_STAFF', label: 'Admin Staff' },
    { value: 'STAFF', label: 'Staff' },
  ];

  if (!canManageUsers) {
    return (
      <div style={styles.accessDenied}>
        <h2>Access Denied</h2>
        <p>You don't have permission to view this page.</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>User Management</h1>
          <p style={styles.subtitle}>Manage SSGI users and their roles</p>
        </div>
        <button style={styles.createButton} onClick={() => setShowModal(true)}>
          + Add New User
        </button>
      </div>

      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={styles.statValue}>{users.length}</div>
          <div style={styles.statLabel}>Total Users</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statValue}>
            {users.filter(u => u.role === 'RESEARCH_SCIENTIST').length}
          </div>
          <div style={styles.statLabel}>Researchers</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statValue}>
            {users.filter(u => u.role === 'GIS_SPECIALIST').length}
          </div>
          <div style={styles.statLabel}>GIS Specialists</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statValue}>
            {users.filter(u => u.is_active).length}
          </div>
          <div style={styles.statLabel}>Active Users</div>
        </div>
      </div>

      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Department</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center' }}>Loading...</td>
              </tr>
            ) : (
              users.map(user => (
                <tr key={user.id}>
                  <td>
                    <div>
                      <div style={styles.userName}>{user.full_name}</div>
                      <div style={styles.userUsername}>@{user.username}</div>
                    </div>
                  </td>
                  <td>{user.email}</td>
                  <td>
                    <span style={{...styles.roleBadge, backgroundColor: getRoleColor(user.role) + '20', color: getRoleColor(user.role)}}>
                      {user.role_display}
                    </span>
                  </td>
                  <td>{user.department || '-'}</td>
                  <td>
                    <span style={{...styles.statusBadge, backgroundColor: user.is_active ? '#c6f6d5' : '#fed7d7', color: user.is_active ? '#22543d' : '#742a2a'}}>
                      {user.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>
                    <button style={styles.actionButton} onClick={() => handleToggleActive(user.id, user.is_active)}>
                      {user.is_active ? 'Deactivate' : 'Activate'}
                    </button>
                    <button style={styles.actionButton} onClick={() => handleDelete(user.id)}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h2>{editingUser ? 'Edit User' : 'Add New User'}</h2>
            <form onSubmit={handleSubmit}>
              <input type="text" placeholder="Username" value={formData.username} onChange={(e) => setFormData({...formData, username: e.target.value})} required />
              <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
              <input type="text" placeholder="First Name" value={formData.first_name} onChange={(e) => setFormData({...formData, first_name: e.target.value})} />
              <input type="text" placeholder="Last Name" value={formData.last_name} onChange={(e) => setFormData({...formData, last_name: e.target.value})} />
              <select value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})}>
                {roles.map(role => (
                  <option key={role.value} value={role.value}>{role.label}</option>
                ))}
              </select>
              <input type="text" placeholder="Phone" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
              <input type="text" placeholder="Department" value={formData.department} onChange={(e) => setFormData({...formData, department: e.target.value})} />
              {!editingUser && (
                <>
                  <input type="password" placeholder="Password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} required={!editingUser} />
                  <input type="password" placeholder="Confirm Password" value={formData.confirm_password} onChange={(e) => setFormData({...formData, confirm_password: e.target.value})} required={!editingUser} />
                </>
              )}
              <div style={styles.modalButtons}>
                <button type="submit">{editingUser ? 'Update' : 'Create'}</button>
                <button type="button" onClick={() => { setShowModal(false); resetForm(); }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const getRoleColor = (role) => {
  const colors = {
    SUPERADMIN: '#e53e3e',
    DG: '#ed8936',
    DDG: '#ed8936',
    DIVISION_HEAD: '#4299e1',
    RESEARCH_SCIENTIST: '#48bb78',
    GIS_SPECIALIST: '#9f7aea',
    DATA_ANALYST: '#f687b3',
    LEGAL_OFFICER: '#fbbf24',
    ADMIN_STAFF: '#a0aec0',
    STAFF: '#718096',
  };
  return colors[role] || '#718096';
};

const styles = {
  container: {
    padding: '24px',
    maxWidth: '1400px',
    margin: '0 auto',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '32px',
  },
  title: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#2d3748',
    marginBottom: '8px',
  },
  subtitle: {
    fontSize: '16px',
    color: '#718096',
  },
  createButton: {
    padding: '10px 20px',
    backgroundColor: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    marginBottom: '32px',
  },
  statCard: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '12px',
    textAlign: 'center',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  statValue: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#667eea',
    marginBottom: '8px',
  },
  statLabel: {
    fontSize: '14px',
    color: '#718096',
  },
  tableContainer: {
    backgroundColor: 'white',
    borderRadius: '12px',
    overflow: 'auto',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  userName: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#2d3748',
  },
  userUsername: {
    fontSize: '12px',
    color: '#a0aec0',
  },
  roleBadge: {
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '500',
    display: 'inline-block',
  },
  statusBadge: {
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '500',
    display: 'inline-block',
  },
  actionButton: {
    padding: '6px 12px',
    margin: '0 4px',
    backgroundColor: '#edf2f7',
    border: 'none',
    borderRadius: '6px',
    fontSize: '12px',
    cursor: 'pointer',
  },
  accessDenied: {
    textAlign: 'center',
    padding: '60px 20px',
    color: '#e53e3e',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: 'white',
    padding: '32px',
    borderRadius: '12px',
    width: '500px',
    maxWidth: '90%',
  },
  modalButtons: {
    display: 'flex',
    gap: '12px',
    marginTop: '20px',
  },
};

// Add CSS for table header
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  th {
    padding: 16px;
    text-align: left;
    font-size: 14px;
    font-weight: 600;
    color: #4a5568;
    background-color: #f7fafc;
    border-bottom: 1px solid #e2e8f0;
  }
  
  td {
    padding: 16px;
    font-size: 14px;
    color: #4a5568;
    border-bottom: 1px solid #e2e8f0;
  }
  
  input, select {
    width: 100%;
    padding: 10px;
    margin-bottom: 12px;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    font-size: 14px;
  }
  
  button:hover {
    opacity: 0.8;
  }
`;
document.head.appendChild(styleSheet);