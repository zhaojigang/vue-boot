<template>
    <el-container class="layout-container">
        <el-header style="text-align: right; font-size: 12px">
            <div class="toolbar">
                <el-dropdown>
                    <el-icon style="margin-right: 8px; margin-top: 1px">
                        <setting />
                    </el-icon>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item @click="logout">退出</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
                <span>张三</span>
            </div>
        </el-header>
        <el-container>
            <el-aside width="200px">
                <el-scrollbar>
                    <!-- 菜单组件 -->
                    <Menu />
                </el-scrollbar>
            </el-aside>
            <el-main>
                <RouterView />
            </el-main>
        </el-container>
    </el-container>
</template>

<script lang="ts" setup>
import { Setting } from '@element-plus/icons-vue'
import { logout } from '@/utils/login'
import Menu from '@/layout/Menu.vue';

</script>

<style scoped>
.layout-container .el-header {
    position: relative;
    background-color: var(--el-color-primary-light-7);
    color: var(--el-text-color-primary);
}

.layout-container .el-aside {
    color: var(--el-text-color-primary);
}

.layout-container .el-menu {
    border-right: none;
}

.layout-container .toolbar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    right: 20px;
}
</style>
