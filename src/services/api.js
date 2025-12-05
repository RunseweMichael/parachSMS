const API_URL = process.env.REACT_APP_API_URL;

// Get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

export const api = {
  // Auth headers
  getHeaders: () => ({
    'Authorization': `Token ${getAuthToken()}`,
    'Content-Type': 'application/json'
  }),

  // Students
  getStudentProfile: async () => {
    const response = await fetch(`${API_URL}/students/me/`, {
      headers: api.getHeaders()
    });
    return response.json();
  },

  // Payment Items
  getPaymentItems: async () => {
    const response = await fetch(`${API_URL}/payment-items/?is_active=true`, {
      headers: api.getHeaders()
    });
    return response.json();
  },

  // Transactions
  getTransactions: async (filters = {}) => {
    const params = new URLSearchParams(filters);
    const response = await fetch(`${API_URL}/transactions/?${params}`, {
      headers: api.getHeaders()
    });
    return response.json();
  },

  // Initialize Payment
  initializePayment: async (data) => {
    const response = await fetch(`${API_URL}/transactions/initialize/`, {
      method: 'POST',
      headers: api.getHeaders(),
      body: JSON.stringify(data)
    });
    return response.json();
  },

  // Verify Payment
  verifyPayment: async (reference) => {
    const response = await fetch(`${API_URL}/verify/${reference}/`, {
      headers: api.getHeaders()
    });
    return response.json();
  },

  // Statistics (Admin)
  getStatistics: async () => {
    const response = await fetch(`${API_URL}/statistics/`, {
      headers: api.getHeaders()
    });
    return response.json();
  },

  // Payment Items CRUD (Admin)
  createPaymentItem: async (data) => {
    const response = await fetch(`${API_URL}/payment-items/`, {
      method: 'POST',
      headers: api.getHeaders(),
      body: JSON.stringify(data)
    });
    return response.json();
  },

  updatePaymentItem: async (id, data) => {
    const response = await fetch(`${API_URL}/payment-items/${id}/`, {
      method: 'PUT',
      headers: api.getHeaders(),
      body: JSON.stringify(data)
    });
    return response.json();
  },

  deletePaymentItem: async (id) => {
    const response = await fetch(`${API_URL}/payment-items/${id}/`, {
      method: 'DELETE',
      headers: api.getHeaders()
    });
    return response.ok;
  }
};