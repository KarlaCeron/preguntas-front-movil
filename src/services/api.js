import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000", // 👈 tu backend
  withCredentials: true,
});

export default API;
