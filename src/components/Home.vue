<template>
    <p id="helloWorld">Hello World!</p>
</template>

<script>
    import { onBeforeMount } from 'vue'
    import { getSign } from '../utils/getSign.js'
    import { nanoid } from 'nanoid'
    import axios from 'axios'
    export default {
        setup() {
            const timestamp = Date.parse(new Date()).toString().slice(0, 10)
            const nonce = nanoid().slice(0, 4)
            onBeforeMount(() => {
                const plainObj = {
                    "pageSize": 10,
                    "pageNumber": 0,
                    "timestamp": timestamp,
                    "nonce": nonce
                }
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