<template>
    <el-dialog :model-value="addBookDialogVisble" title="" @close="handleClose">
        <el-form ref="formRef" :model="form" :rules="formRules">
            <el-form-item label="书籍ID" prop="id" v-if="bookValue">
                <el-input v-model="form.id" />
            </el-form-item>
            <el-form-item label="书籍名称" prop="name">
                <el-input v-model="form.name" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="handleClose">取消</el-button>
                <el-button type="primary" @click="addOrUpdateBook(formRef)">
                    完成
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import 'element-plus/dist/index.css'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'

import type { Book } from '@/types/book';
import { addOrUpdate } from '@/api/book';

const props = defineProps<{
    addBookDialogVisble?: Boolean,
    bookValue: Book | undefined
}>()

const emits = defineEmits(['update:modelValue', 'getBooks'])

const handleClose = () => {
    emits('update:modelValue', false)
}

const formRules = ref<FormRules>({
    name: [
        { required: true, message: '请输入书名', trigger: 'blur' }
    ]
})

const formRef = ref<FormInstance>()
const addOrUpdateBook = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid) => {
        if (valid) {
            addOrUpdateBookInner()
        } else {
            return false
        }
    })
}

const form = ref<Book>({
    id: -1,
    name: ''
})

const addOrUpdateBookInner = async () => {
    await addOrUpdate(form.value)
    ElMessage({
        message: '操作成功',
        type: 'success'
    })
    handleClose()
    emits('getBooks')
}

watch(form.value,
    () => {
        if (props.bookValue) {
            form.value = props.bookValue
        }
    },
    { deep: true, immediate: true })
</script>
<style scoped>
.dialog-footer button:first-child {
    margin-right: 10px;
}
</style>
