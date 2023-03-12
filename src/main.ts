/* 引入根组件创建函数 */
import { createApp } from 'vue'
/* 引入状态管理器Pinia创建函数 */
import { createPinia } from 'pinia'
/* 引入根组件 */
import App from './App.vue'
/* 引入vue-router */
import router from './router'
/* 引入主css */
import './assets/main.css'
/* 引入守卫路由 */
import '@/router/permission'

/* 创建应用 */
const app = createApp(App)
/* 使用pinia做状态管理 */
app.use(createPinia())
/* 使用vue-router做路由 */
app.use(router)
/* 应用管理id=app的div */
app.mount('#app')
