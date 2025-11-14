// apiPublic.js
import axios from "axios";

const apiPublic = axios.create({
  // baseURL: "http://127.0.0.1:8000/api/",
  baseURL: 'https://parachsms.pythonanywhere.com/api/',
});

export default apiPublic;
