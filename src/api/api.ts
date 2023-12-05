import axios from "axios";
import sanitizedConfig from "../config";
import { store } from "../app/store";

const http = axios.create({
    baseURL: `${sanitizedConfig.API_URL}/api/u`,
    timeout: 1000,
    headers: {
        "Content-Type": "application/json",
    }
});

http.interceptors.request.use(config => {
    // Retrieve the token from the store at the time of the request
    const token = store.getState().users.userToken;

    // Ensure that headers object exists
    if (!config.headers) {
        config.headers = {};
    }
    
    // If token exists, add it to the authorization header
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
}, error => {
    return Promise.reject(error);
});


export default http;
