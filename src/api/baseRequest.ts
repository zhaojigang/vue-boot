import { useUserStore } from "@/stores/user";
import { logout } from "@/utils/login";
import axios from "axios"
const axiosService = axios.create({
    baseURL: import.meta.env.VITE_DOMAIN_URL_TM_JOY,
    timeout: 1000
})

// 添加请求拦截器
axiosService.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    const userStore = useUserStore()
    if ('user/logout' != config.url && 'user/login' != config.url && userStore.getToken() && userStore.tokenIsExpired()) {
        logout()
        return Promise.reject(new Error('token过期了'))
    }

    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
axiosService.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default axiosService