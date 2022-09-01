<template>
    <div class="loginContainer">
        <div class="loginBox">
            <el-form class="loginForm" label-position="right" label-width="80px" :model="loginForm">
                <el-form-item label="username">
                    <el-input v-model="loginForm.username"></el-input>
                </el-form-item>
                <el-form-item label="password">
                    <el-input v-model="loginForm.password" type="password"></el-input>
                </el-form-item>
                <el-form-item class="btns">
                    <el-button type="primary" @click="login">Login</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import { ref, getCurrentInstance } from 'vue'
    import { useRouter } from 'vue-router'
    import { nanoid } from 'nanoid'
    import { getSign } from '../utils/getSign.js'
    import { getToken } from '../api'
    export default {
        props: {

        },
        setup() {
            const router = useRouter()
            let loginForm = ref({
                username: '',
                password: ''
            })
            const currentInstance = getCurrentInstance()

            const login = () => {
                const { username, password } = loginForm.value
                if (username === 'libra' && password === 'xxxxx') {
                    const timestamp = Date.parse(new Date()).toString().slice(0, 10)
                    const nonce = nanoid().slice(0, 4)
                    const plainObj = {
                        "account": username,
                        "password": password,
                        "timestamp": timestamp,
                        "nonce": nonce
                    }
                    const sig = getSign(plainObj)
                    plainObj["sig"] = sig
                    getToken(plainObj).then((res) => {
                        const token = res.data.token
                        window.sessionStorage.setItem('token', token)
                        router.push('/home')
                    })
                } else {
                    currentInstance.appContext.config.globalProperties.$message.error('请输入正确的用户名和密码！')
                }
            }
            return {
                loginForm,
                login
            }
        }
    }
</script>

<style scoped>
    .loginContainer,
    .loginBox {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .loginContainer {
        position: absolute;
        height: 100%;
        width: 100%;
        background-color: rgb(248, 204, 147);
    }

    .loginBox {
        background-color: rgb(236, 241, 154);
        width: 450px;
        height: 300px;
        border-radius: 3px;
    }

    .el-button {
        margin-left: auto;
        margin-right: 0;
    }
</style>