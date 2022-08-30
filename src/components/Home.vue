<template>
    <div id="table">
        <el-table :data="users" stripe style="width: 100%">
            <el-table-column prop="user_id" label="user_id">
            </el-table-column>
            <el-table-column prop="name" label="Name">
            </el-table-column>
            <el-table-column prop="age" label="Age">
            </el-table-column>
            <el-table-column prop="address" label="Address">
            </el-table-column>
            <el-table-column prop="gender" label="Gender">
            </el-table-column>
            <el-table-column prop="cellphone" label="Cellphone">
            </el-table-column>
            <el-table-column prop="createAt" label="CreateAt">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import { onBeforeMount, ref, onMounted } from 'vue'
    import { getSign } from '../utils/getSign.js'
    import { nanoid } from 'nanoid'
    import axios from 'axios'
    export default {
        setup() {
            const timestamp = Date.parse(new Date()).toString().slice(0, 10)
            const nonce = nanoid().slice(0, 4)
            let users = ref([])
            onBeforeMount(async () => {
                const token = window.sessionStorage.getItem('token')
                const plainObj = {
                    "pageSize": 10,
                    "pageNumber": 0,
                    "timestamp": timestamp,
                    "nonce": nonce
                }
                const sig = encodeURIComponent(getSign(plainObj))
                const { data: res } = await axios.get(`/api/libra/user?pageSize=10&pageNumber=0&timestamp=${timestamp}&nonce=${nonce}&sig=${sig}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                users.value = res.data.users
            })

            return {
                users
            }
        }
    }
</script>

<style scoped>
    #table {
        width: 900px;
        height: auto;
        margin: 0 auto;
    }
</style>