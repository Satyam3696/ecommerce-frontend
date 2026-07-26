const BASE_URL =
  typeof process.env.REACT_APP_API_URL === "string"
    ? process.env.REACT_APP_API_URL
    : "http://localhost:8080/api";

const API = {
  BASE_URL,

  PRODUCT: `${BASE_URL}/product`,
  CATEGORY: `${BASE_URL}/category`,
  CART: `${BASE_URL}/cart`,
  ORDER: `${BASE_URL}/order`,
  USER: `${BASE_URL}/user`,
}
;

export default API;


















// const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8080/api";


// const API = {

//   BASE_URL: BASE_URL,

//   PRODUCT: BASE_URL + "/product",

//   CATEGORY: BASE_URL + "/category",

//   CART: BASE_URL + "/cart",

//   ORDER: BASE_URL + "/order",

//   USER: BASE_URL + "/user",

// };


// export default API;