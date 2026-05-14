import axios from "axios";
import Cookies from "js-cookie";
const api=axios.create({
    baseURL:"http://127.0.0.1:8000/api/v1",
    withCredentials:true,
})

api.interceptors.request.use(
    (config)=>{
        const accessToken=Cookies.get('access');
        if(accessToken){
            config.headers.Authorization=`Bearer ${accessToken}`
        }
        return config;
    },
    (error) => Promise.reject(error)
)
export default api;