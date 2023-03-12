import type { Ref } from "vue";
import type { User as LoginUser } from '@/types/user'
import { useUserStore } from "@/stores/user"
import { login as userLogin, logout as userLogout } from '@/api/login'
import router from "@/router";

export function login(loginForm: Ref<LoginUser>) {
    /* 使用 pinia store */
    const userStore = useUserStore()
    /* 定义函数 */
    async function loginTrue() {
        await userLogin(loginForm.value).then(resp => {
            /* 保存token到浏览器缓存 */
            userStore.saveToken(resp.data.token)
            /* 保存登录时间 */
            userStore.saveCurrentTokenTime()
            /* 跳转到首页 */
            router.replace('/')
        })
    }
    /* 调用函数 */
    loginTrue()
}

export function logout() {
    /* 使用 pinia store */
    const userStore = useUserStore()
    /* 定义函数 */
    async function logoutTrue() {
        const token = userStore.getToken()
        if (token) {
            await userLogout(token).then(resp => {
                /* 删除缓存token */
                userStore.removeToken()
                /* 删除缓存的登录时间 */
                userStore.removeTokenTime()
                /* 跳转到登录页 */
                router.replace('/login')
            })
        }
    }
    /* 调用函数 */
    logoutTrue()
}