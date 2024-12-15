import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: "http://localhost:1010/",
    headers: {
        'Content-Type': 'application/json'
    },
});


axiosInstance.interceptors.request.use(
    (config) => {
        const tokenJWT = localStorage.getItem("token")

        if (tokenJWT) {
            config.headers['Authorization'] = `Bearer ${tokenJWT}`
        }
        return config

    }, (error) => {
        return Promise.reject(error);
    }

)

export default axiosInstance;