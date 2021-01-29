import Vue from "vue";
import axios from "axios";
import { authHeader } from "../helpers/auth_header";

const axiosInstance = axios.create({
  baseURL: process.env.BACKEND_URL + "/api/",
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
    Authorization: authHeader()
  },
  credentials: true
});

Vue.prototype.$axios = axiosInstance;

// Here we define a named export
// that we can later use inside .js files:
export { axiosInstance };
