import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    // baseURL: "https://crm.elemer.pl/api/",
    headers: {
        'Content-Type': 'application/json'
    },
});


axiosInstance.interceptors.request.use(
    (config) => {
        const tokenJWT = localStorage.getItem("token")

        if (tokenJWT) {
            config.headers['Content-Type'] = 'application/json'
            config.headers['Authorization'] = `Bearer ${tokenJWT}`
        }
        return config

    }, (error) => {
        return Promise.reject(error);
    }

)

export default axiosInstance;