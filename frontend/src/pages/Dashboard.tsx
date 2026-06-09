import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();

  const stats = [
    { title: 'Active Projects', value: '12', icon: '🚀', color: '#667eea' },
    { title: 'Tasks Completed', value: '84', icon: '✅', color: '#48bb78' },
    { title: 'Team Members', value: '24', icon: '👥', color: '#4299e1' },
    { title: 'Hours Logged', value: '1,234', icon: '⏱️', color: '#ed8936' },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Welcome back, {user?.name || 'Researcher'}! 👋</h1>
        <p style={styles.subtitle}>Here's what's happening with your projects today.</p>
      </div>

      <div style={styles.statsGrid}>
        {stats.map((stat, index) => (
          <div key={index} style={styles.statCard}>
            <div style={{...styles.statIcon, backgroundColor: stat.color + '10', color: stat.color }}>
              {stat.icon}
            </div>
            <div>
              <div style={styles.statValue}>{stat.value}</div>
              <div style={styles.statTitle}>{stat.title}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={styles.contentGrid}>
        <div style={styles.mainCard}>
          <h3>Recent Activity</h3>
          <div style={styles.activityList}>
            {[1,2,3,4].map(i => (
              <div key={i} style={styles.activityItem}>
                <div style={styles.activityIcon}>📝</div>
                <div>
                  <div style={styles.activityTitle}>Project update submitted</div>
                  <div style={styles.activityTime}>2 hours ago</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.sideCard}>
          <h3>Upcoming Deadlines</h3>
          <div style={styles.deadlineList}>
            {[1,2,3].map(i => (
              <div key={i} style={styles.deadlineItem}>
                <div>Research Report v{i}</div>
                <div style={styles.deadlineDate}>Due in {i} days</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '1400px',
    margin: '0 auto',
  },
  header: {
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
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '20px',
    marginBottom: '32px',
  },
  statCard: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  statIcon: {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
  },
  statValue: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#2d3748',
  },
  statTitle: {
    fontSize: '14px',
    color: '#718096',
  },
  contentGrid: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '24px',
  },
  mainCard: {
    backgroundColor: 'white',
    padding: '24px',
    borderRadius: '12px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  sideCard: {
    backgroundColor: 'white',
    padding: '24px',
    borderRadius: '12px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  activityList: {
    marginTop: '16px',
  },
  activityItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 0',
    borderBottom: '1px solid #e2e8f0',
  },
  activityIcon: {
    fontSize: '20px',
  },
  activityTitle: {
    fontSize: '14px',
    fontWeight: '500',
    marginBottom: '4px',
  },
  activityTime: {
    fontSize: '12px',
    color: '#a0aec0',
  },
  deadlineList: {
    marginTop: '16px',
  },
  deadlineItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 0',
    borderBottom: '1px solid #e2e8f0',
  },
  deadlineDate: {
    fontSize: '12px',
    color: '#ed8936',
  },
};