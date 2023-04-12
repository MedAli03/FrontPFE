import axios from "axios";
import router from "./router";

const axiosClient = axios.create({
    baseURL: "http://127.0.0.1:8000/api"
})

axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

axiosClient.interceptors.response.use(response =>{
    return response;
},error => {
    if(error.response && error.response.status === 401){
        router.navigate('/auth')
        return error;
    }

    throw error;
})
export default axiosClient;