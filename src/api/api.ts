import axios from "axios";
import sanitizedConfig from "../config";
import { store } from "../app/store";


    const token = store.getState().users.userToken;

    const http = axios.create({
        baseURL: `sanitizedConfig.API_URL/api/u`,
        timeout: 1000,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        }
    });

    export default http;
