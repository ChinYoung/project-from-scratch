import axios from 'axios'
const url = import.meta.env.VITE_URL
const getToken = async (user) => {
    const { data: res } = await axios.post(`${url}/account`, user)
    return res
}
const getusers = async (timestamp, nonce, sig, token) => {
    const { data: res } = await axios.get(`${url}/user?pageSize=10&pageNumber=0&timestamp=${timestamp}&nonce=${nonce}&sig=${sig}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return res.data.users
}
export { getToken, getusers }