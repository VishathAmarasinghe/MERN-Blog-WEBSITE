import axios from "axios";

// Create an Axios instance with a base URL
const api = axios.create({
  baseURL: "https://mern-blog-website-umber.vercel.app/api/", // Replace with your base URL
});

export default api;
