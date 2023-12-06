import axios from "axios";
import sanitizedConfig from "../config";
import { store } from "../app/store";
import { AxiosRequestHeaders } from "axios";

const axiosConfig = {
  baseURL: `${sanitizedConfig.API_URL}/api`,
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
};

const http = axios.create({ ...axiosConfig });

http.interceptors.request.use(
  (config) => {
    // Retrieve the token from the store at the time of the request

    const token = store.getState().users.userToken;

    // If token exists, add it to the authorization header
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default http;
