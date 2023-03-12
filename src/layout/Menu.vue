<template>
    <el-menu default-active="1" class="el-menu-vertical-demo" router>
        <el-menu-item index="/">
            <el-icon><icon-menu /></el-icon>
            <span>首页</span>
        </el-menu-item>
        <el-menu-item index="bookList">
            <el-icon>
                <document />
            </el-icon>
            <span>书籍管理</span>
        </el-menu-item>
    </el-menu>
</template>

<script lang="ts" setup>
import {
    Document,
    Menu as IconMenu
} from '@element-plus/icons-vue'
import { RouterLink } from 'vue-router'
</script>
