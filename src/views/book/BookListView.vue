<template>
    <el-card>
        <el-row :gutter="20">
            <el-col :span="7">
                <el-input v-model="queryParams.name" placeholder="请输入书名" clearable />
            </el-col>
            <el-button type="primary" :icon="Search" @click="handleSearch">搜索</el-button>
            <el-button type="primary" @click="addOrUpdateBook(undefined)">新建书籍</el-button>
        </el-row>
    </el-card>

    <el-table :data="tableData" class="space">
        <el-table-column prop="id" label="序号" fixed />
        <el-table-column prop="name" label="书名" />
        <el-table-column label="操作">
            <template #default="{ row }">
                <el-button type="primary" :icon="Edit" @click="addOrUpdateBook(row)">更新</el-button>
                <el-button type="danger" :icon="Delete" @click="openDeleteMessageBox(row.id)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>

    <el-pagination class="space" v-model:current-page="queryParams.pageNum" v-model:page-size="queryParams.pageSize"
        :page-sizes="[2, 4, 6, 8]" layout="prev, pager, next, jumper, sizes, total" :total="totalCount"
        @size-change="handleSizeChange" @current-change="handleCurrentChange" />

    <AddBookDialog v-model="addBookDialogVisble" v-if="addBookDialogVisble" @getBooks="getBooks"
        :bookValue="bookValue" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Book, BookRequest } from '@/types/book'
import { getByRequest, remove } from '@/api/book'
import { Delete, Edit, Search } from '@element-plus/icons-vue'
import AddBookDialog from '@/components/book/AddBookDialog.vue';
import { ElMessage, ElMessageBox } from 'element-plus';

/* 定义查询请求参数 */
const queryParams = ref<BookRequest>({
    name: "",
    pageNum: 1,
    pageSize: 2
})

/* 获取列表数据 */
const totalCount = ref(0)
const tableData = ref<Book[]>([])
const getBooks = async () => {
    await getByRequest(queryParams.value).then(resp => {
        tableData.value = resp.data.dataList
        totalCount.value = resp.data.totalCount
    }).catch(error => console.log(error))
}

onMounted(() => {
    getBooks()
})

/* 处理搜索数据 */
function handleSearch() {
    queryParams.value.pageNum = 1
    getBooks()
}

/* 处理页大小变化数据 */
function handleSizeChange(pageSize: number) {
    queryParams.value.pageSize = pageSize
    queryParams.value.pageNum = 1
    getBooks()
}

/* 处理页码变化数据 */
function handleCurrentChange(pageNum: number) {
    queryParams.value.pageNum = pageNum
    getBooks()
}

const addBookDialogVisble = ref<Boolean>(false)
const bookValue = ref<Book>()
function addOrUpdateBook(book: Book | undefined) {
    if (!book) {
        bookValue.value = undefined
    } else {
        bookValue.value = book
    }
    addBookDialogVisble.value = true
}

function openDeleteMessageBox(id: number) {
    ElMessageBox.confirm(
        `要继续删除数据 [id=${id}] 吗？`,
        '',
        {
            confirmButtonText: '删除',
            cancelButtonText: '取消',
            type: 'warning'
        }
    ).then(() => {
        deleteBook(id)
        ElMessage({
            type: 'success',
            message: '删除成功'
        })
    }).catch(() => { })
}

async function deleteBook(id: number) {
    await remove({ bookId: id })
    getBooks()
}
</script>

<style>
.space {
    padding-top: 16px;
    /* box-sizing: border-box; */
}
</style>