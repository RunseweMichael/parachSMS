import api from './api'; // Your configured Axios instance

// Get dashboard stats
const fetchStats = async () => {
  try {
    const response = await api.get('/admin-panel/dashboard/stats/');
    setStats(response.data);
  } catch (error) {
    console.error('Failed to fetch stats:', error);
  }
};

// Toggle student status
const toggleStudent = async (studentId) => {
  try {
    const response = await api.post(
      `/admin-panel/students/${studentId}/toggle_active/`
    );
    alert(response.data.message);
  } catch (error) {
    alert('Failed to toggle student status');
  }
};

// Get notifications
const fetchNotifications = async () => {
  try {
    const response = await api.get('/admin-panel/notifications/');
    setNotifications(response.data);
  } catch (error) {
    console.error('Failed to fetch notifications:', error);
  }
};