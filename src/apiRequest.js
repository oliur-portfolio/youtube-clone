import axios from "axios";

export const publicReq = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}/api/`,
    withCredentials: true,
});
