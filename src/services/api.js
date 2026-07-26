import axios from "axios";
import API from "../config/apiConfig";

const api = axios.create({
  baseURL: String(API.BASE_URL),
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;