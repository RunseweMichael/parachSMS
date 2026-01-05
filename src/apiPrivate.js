import axios from "axios";

const apiPrivate = axios.create({
  baseURL: "https://studentmgt.whalesharkengineering.com.ng/api/",
//   baseURL: 'http://127.0.0.1:8000/api/',
});

export default apiPrivate;
