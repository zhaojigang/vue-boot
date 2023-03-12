/* 定义书籍接口 */
export interface Book {
    id: number,
    name: string
}

/* 定义查询请求参数接口 */
export interface BookRequest {
    name: string,
    pageNum: number,
    pageSize: number
}