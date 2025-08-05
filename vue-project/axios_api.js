import axios from "axios";

const axiosRequest = axios.create({
    baseURL: "http://127.0.0.1:8000",
    timeout: 1800000,
    headers: {
        'Content-Type': 'application/json'
    }
})

export default axiosRequest;