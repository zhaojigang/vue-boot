/* 封装登录相关的 api */
import axiosService from './baseRequest'

/* 登录 */
export function login(data: {}) {
    return axiosService.request({
        url: 'user/login',
        method: 'post',
        data: data
    })
}

/* 退出 */
export function logout(data: {}) {
    return axiosService.request({
        url: 'user/logout',
        method: 'post',
        data: data
    })
}