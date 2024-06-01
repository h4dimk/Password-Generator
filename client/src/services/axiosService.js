import axios from "axios";

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}/api`,
  // timeout: 5000,
});



export default instance;