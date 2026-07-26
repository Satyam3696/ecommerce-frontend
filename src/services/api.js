import axios from "axios";
import API from "./apiConfig";

const api = axios.create({
  baseURL: API.BASE_URL,
}
);

export default api;
















// import axios from "axios";
// import BASE_URL from "../config/apiConfig";


// const api = axios.create({
//     baseURL: BASE_URL
// });


// export default api;