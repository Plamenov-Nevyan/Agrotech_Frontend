const baseUrl = 'http://localhost:5000'
const endpoints = {
    REGISTER : '/register',
    LOGIN: '/login'
}

export const registerUser = async (userData) => {
    let resp = await fetch(baseUrl + endpoints.REGISTER, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(userData)
    })
    userData = await resp.json()
    sessionStorage.setItem('session', JSON.stringify(userData))
    return {email: userData.email, username : userData.username, _id : userData._id}
}

export const loginUser = async (userData) => {
    let resp = await fetch(baseUrl + endpoints.LOGIN, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(userData)
    })
    userData = await resp.json()
    sessionStorage.setItem('session', JSON.stringify(userData))
    return {email: userData.email, username : userData.username, _id : userData._id}
}