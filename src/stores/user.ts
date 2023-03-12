import { TOKEN_DURATION, TOKEN_DURATION_KEY, TOKEN_KEY } from "@/utils/constants";
import { defineStore } from "pinia";

export const useUserStore = defineStore('user', () => {
    /* 保存token */
    function saveToken(token: string) {
        localStorage.setItem(TOKEN_KEY, token)
    }
    /* 获取token */
    function getToken(): string | null {
        return localStorage.getItem(TOKEN_KEY)
    }
    /* 删除token */
    function removeToken() {
        localStorage.removeItem(TOKEN_KEY)
    }
    /* 保存token存入的时间 */
    function saveCurrentTokenTime() {
        localStorage.setItem(TOKEN_DURATION_KEY, Date.now().toString())
    }
    /* 获取token存入的时间 */
    function getTokenTime(): number | null {
        const tokenTime = localStorage.getItem(TOKEN_DURATION_KEY)
        if (tokenTime) {
            return Number(tokenTime)
        }
        return null
    }
    /* 删除token存入的时间 */
    function removeTokenTime() {
        localStorage.removeItem(TOKEN_DURATION_KEY)
    }
    /* token是否过期 */
    function tokenIsExpired() {
        const tokenTime = getTokenTime()
        if (!tokenTime) {
            return true
        }
        return Date.now() - tokenTime > TOKEN_DURATION
    }

    return { saveToken, getToken, removeToken, saveCurrentTokenTime, getTokenTime, removeTokenTime, tokenIsExpired }
})