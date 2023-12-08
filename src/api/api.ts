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
        if (config.headers) {
            if (token) {
                config.headers["Authorization"] = `Bearer ${token}`;
            }
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// TODO: Check for an alternative to this
// http.interceptors.response.use(
//     response => response,
//     async (error) => {
//         const originalRequest = error.config;

//         // Check for 401 Unauthorized
//         if (error.response.status === 401 && !originalRequest._retry) {
//             originalRequest._retry = true;
            
//             // Wait for the token to become available or refresh it
//             await refreshTokenOrWaitForToken();
            
//             // Update the token in the header
//             originalRequest.headers['Authorization'] = `Bearer ${store.getState().users.userToken}`;

//             // Retry the request with the new token
//             return http(originalRequest);
//         }

//         return Promise.reject(error);
//     }
// );

// async function refreshTokenOrWaitForToken() {
//     const token = store.getState().users.userToken;
//     if (token) {
//         // Refresh the token
//         await store.dispatch(refreshToken());
//     } else {
//         // Wait for the token to become available
//         await new Promise(resolve => setTimeout(resolve, 1000));
//     }
// }

export default http;
