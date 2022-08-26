import md5 from 'js-md5'
const handleObj = (obj) => {
    const params = Object.entries(obj)
    const str = params.filter(([key, value]) => value !== undefined && key !== 'sig')
        .map(([key, value]) => {
            if (typeof value === 'object')
                return `${key}=${handleObj(value)}`
            if (Array.isArray(value))
                return `${key}=${handleArray(value)}`
            return `${key}=${value}`
        }).sort()
        .join('&')
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
    const token = window.sessionStorage.getItem('token') ?? 'Bearer'
    const str = handleObj(plainObj) + token
    return md5.base64(str)
}

export { getSign }