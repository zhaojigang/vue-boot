<template>
    <el-menu default-active="1" class="el-menu-vertical-demo">
        <RouterLink to="/">
            <el-menu-item index="1">
                <el-icon><icon-menu /></el-icon>
                <span>首页</span>
            </el-menu-item>
        </RouterLink>
        <RouterLink to="/bookList">
            <el-menu-item index="2">
                <el-icon>
                    <document />
                </el-icon>
                <span>书籍管理</span>
            </el-menu-item>
        </RouterLink>
    </el-menu>
</template>

<script lang="ts" setup>
import {
    Document,
    Menu as IconMenu
} from '@element-plus/icons-vue'
import { RouterLink } from 'vue-router'
</script>
