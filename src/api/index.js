import axios from 'axios'
const env = import.meta.env.MODE
const getToken = async (user) => {
    let url = ''
    if (env === 'development') url = '/api/libra/account'
    if (env === 'production') url = '/libra/account'
    const { data: res } = await axios.post(url, user)
    return res
}
const getusers = async (timestamp, nonce, sig, token) => {
    let url = ''
    if (env === 'development') url = `/api/libra/user?pageSize=10&pageNumber=0&timestamp=${timestamp}&nonce=${nonce}&sig=${sig}`
    if (env === 'production') url = `/libra/user?pageSize=10&pageNumber=0&timestamp=${timestamp}&nonce=${nonce}&sig=${sig}`
    const { data: res } = await axios.get(url, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return res.data.users
}
export { getToken, getusers }