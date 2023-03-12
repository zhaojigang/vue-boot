import { useUserStore } from "@/stores/user"
import router from "./index"
const whiteList = ['/login']
/* 
* to-目标导航
* from-来源导航
* next-函数，可以指定去往任意的导航
*/
router.beforeEach((to, from, next) => {
    const userStore = useUserStore()
    if (userStore.getToken()) {
        if (to.path === '/login') {
            next("/")
        } else {
            next()
        }
    } else {
        if (whiteList.includes(to.path)) {
            next()
        } else {
            next('/login')
        }
    }
})