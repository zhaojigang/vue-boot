/* 书籍相关的api */
import axiosService from "./baseRequest"

/* 获取书籍列表 */
export function getByRequest(params: {}) {
    return axiosService.request({
        url: 'book/getByRequest',
        method: 'get',
        params: params
    })
}

/* 新增或者更新书籍 */
export function addOrUpdate(data: {}) {
    return axiosService.request({
        url: 'book/addOrUpdate',
        method: 'post',
        data: data
    })
}

/* 删除书籍 */
export function remove(params: {}) {
    return axiosService.request({
        url: 'book/delete',
        method: 'delete',
        params: params
    })
}