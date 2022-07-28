const baseUrl = 'http://localhost:5000'
const endpoints = {
    REGISTER : '/register',
    LOGIN: '/login'
}

export const registerUser = async (userData) => {
  try {  
    let resp = await fetch(baseUrl + endpoints.REGISTER, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(userData)
    })
    let newUser = await resp.json()
    if(resp.status !== 200){throw newUser}
    sessionStorage.setItem('session', JSON.stringify(newUser))
    return newUser
}
catch(err){
    throw err
}
}

export const loginUser = async (userData) => {
   try{ let resp = await fetch(baseUrl + endpoints.LOGIN, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(userData)
    })
    let loggedUser = await resp.json()
    console.log(loggedUser)
    if(resp.status !== 200){throw loggedUser}
    sessionStorage.setItem('session', JSON.stringify(loggedUser))
    return loggedUser
}catch(err){
    throw err
}
}