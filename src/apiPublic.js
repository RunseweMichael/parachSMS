import axios from "axios";

const apiPublic = axios.create({
  baseURL: "https://parachsms.pythonanywhere.com/api/",
  headers: {
    "Content-Type": "application/json",
  },
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
