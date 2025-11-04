import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/', // ✅ keep trailing slash for consistency
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ Automatically attach Token header to all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Token ${token}`; // ✅ FIXED: 'Token' not 'Bearer'
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Optional: handle 401 globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized — clearing token and redirecting to login.");
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
