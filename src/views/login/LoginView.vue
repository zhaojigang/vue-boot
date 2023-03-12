<template>
    <el-form ref="loginFormRef" :model="loginForm" status-icon :rules="rules" label-width="120px">
        <el-form-item label="姓名" prop="name" required>
            <el-input v-model="loginForm.name" :prefix-icon="User" autofocus />
        </el-form-item>
        <el-form-item label="密码" prop="password" required>
            <el-input v-model="loginForm.password" type="password" :prefix-icon="Edit" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm(loginFormRef)">登录</el-button>
        </el-form-item>
    </el-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { FormInstance, FormRules } from 'element-plus'
import { User, Edit } from '@element-plus/icons-vue'
/* 防止重名，使用别名 */
import type { User as LoginUser } from '@/types/user'
import {login as userLogin} from '@/utils/login'

const loginFormRef = ref<FormInstance>()
const loginForm = ref<LoginUser>({
    name: '',
    password: ''
})

const rules = ref<FormRules>({
    name: [
        { required: true, message: '请输入姓名', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' }
    ]
})

const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            userLogin(loginForm)
        } else {
            return false
        }
    })
}

</script>