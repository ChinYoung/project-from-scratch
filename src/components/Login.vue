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
    import axios from 'axios'
    import { nanoid } from 'nanoid'
    import md5 from 'js-md5'
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

            const handleObj = (obj) => {
                const params = Object.entries(obj)
                const str = params.filter(([key, value]) => value !== undefined && key !== 'sig')
                    .map(([key, value]) => {
                        if (typeof value === 'object')
                            return `${key}=${handleObj(value)}`
                        if (Array.isArray(value))
                            return `${key}=${handleArray(value)}`
                        return `${key}=${value}`
                    }).join('&')
                return `{${str}}`
            }

            const handleArray = (arr) => {
                const str = arr.map((item) => {
                    if (typeof item === 'object') return handleObj(item)
                    if (Array.isArray(item)) return handleArray(item)
                    return item
                }).join(',')
                return `[${str}]`
            }

            const getSign = (plainObj) => {
                const str = handleObj(plainObj) + 'Bearer'
                return btoa(md5(str))
            }

            const login = async () => {
                const { username, password } = loginForm.value
                if (username === 'libra' && password === 'xxxxx') {
                    const timestamp = Date.parse(new Date()).toString().slice(0, 10)
                    const nonce = nanoid().slice(0, 4)
                    const plainObj = {
                        "account": username,   // 'libra'
                        "password": password,  // 'xxxxx'
                        "timestamp": timestamp, // 1660641536
                        "nonce": nonce         // '9957'
                    }

                    const sig = getSign(plainObj)
                    console.log(sig)

                    const { data: res } = await axios.post('/api/libra/account', {
                        "account": username,     // 'libra'
                        "password": password,    // 'xxxxx'
                        "timestamp": timestamp,  // 1660641536
                        "nonce": nonce,          // '9957'
                        "sig": sig               // "iQdevJKV7rSuM1ug97YWKw=="
                    })
                    window.sessionStorage.setItem('token', res.data.token)
                    router.push('/home')
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