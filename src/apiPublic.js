import axios from "axios";

const apiPublic = axios.create({
  // baseURL: "http://127.0.0.1:8000/api/",
    // baseURL: 'https://parachsms.pythonanywhere.com/api/',
    baseURL: 'https://mike96.pythonanywhere.com',
});

// 🔥 Attach token automatically to every request
apiPublic.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default apiPublic;
