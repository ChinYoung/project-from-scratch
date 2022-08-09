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
    import { ref } from 'vue'
    import { useRouter } from 'vue-router'
    export default {
        props: {

        },
        setup() {
            const router = useRouter()
            let loginForm = ref({
                username: '',
                password: ''
            })
            const login = () => {
                if (loginForm.value.username === 'admin' && loginForm.value.password === '123456') {
                    //window.sessionStorage.setItem('token', )
                    router.push('/home')
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