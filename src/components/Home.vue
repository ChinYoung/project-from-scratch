<template>
    <p id="helloWorld">Hello World!</p>
</template>

<script>
    import { onBeforeMount, getCurrentInstance, inject } from 'vue'
    import { getSign } from '../utils/getSign.js'
    import { nanoid } from 'nanoid'
    import axios from 'axios'
    export default {
        setup() {
            const currentInstance = getCurrentInstance()
            const eventBus = currentInstance.appContext.config.globalProperties.$eventBus

            // const user = inject('loginForm')
            // console.log(user)

            const timestamp = Date.parse(new Date()).toString().slice(0, 10)
            const nonce = nanoid().slice(0, 4)
            onBeforeMount(() => {
                let plainObj = {}
                eventBus.on('getUser', (user) => {
                    plainObj = {
                        "account": user.username,
                        "password": user.password,
                        "timestamp": timestamp,
                        "nonce": nonce
                    }
                })
                const sig = encodeURIComponent(getSign(plainObj))
                axios.get(`/api/libra/user?pageSize=10&pageNumber=0&timestamp=${timestamp}&nonce=${nonce}&sig=${sig}`).then(
                    res => {
                        console.log(res)
                    }
                )
            })
        }
    }
</script>

<style scoped>

</style>