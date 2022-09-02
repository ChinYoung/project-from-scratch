import axios from 'axios'
const url = import.meta.env.VITE_URL
const httpRequest = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
})
const getToken = async (user) => {
    const { data: res } = await httpRequest.post(`${url}/account`, user)
    return res
}
const getusers = async (timestamp, nonce, sig, token) => {
    const { data: res } = await httpRequest.get(`${url}/user?pageSize=10&pageNumber=0&timestamp=${timestamp}&nonce=${nonce}&sig=${sig}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return res.data.users
}
export { getToken, getusers }