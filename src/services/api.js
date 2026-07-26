import axios from "axios";
import API from "./apiConfig";

const api = axios.create({
  baseURL: API.BASE_URL,
}
);

export default api;
















