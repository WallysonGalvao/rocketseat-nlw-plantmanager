import axios from "axios";

const api = axios.create({
  baseURL: "http://<IP_ADDRESS>",
});

export default api;
