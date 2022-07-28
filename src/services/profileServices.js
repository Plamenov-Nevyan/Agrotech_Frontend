import {convertToFormData} from "../utils/convertToFormData"
import { getSession } from "../utils/getUserSession"
const baseUrl = 'http://localhost:5000'
const endpoints = {
    GET_USER_INFO : '/users/profile/',
    ADD_PROFILE_PIC : '/users/add-prof-pic/'
}

export const getUserProfile = async (userId) => {
    let resp = await fetch(baseUrl + endpoints.GET_USER_INFO + userId)
    let userInfo = await resp.json()
    return userInfo
}

export const addProfilePic = async(userId, profilePic) => {
    let userData = getSession()
    if(!userData){throw {message: 'Unauthorized !'}}
    else if(typeof profilePic === 'object'){
         let formData = new FormData()
         formData.append('file', profilePic)
         console.log(formData)
        let resp = await fetch(baseUrl + endpoints.ADD_PROFILE_PIC + userId, {
            method: 'POST',
            headers: {'x-authorization':userData.accessToken},
            body: formData
        })
    }
    else {
        let resp = await fetch(baseUrl + endpoints.ADD_PROFILE_PIC + userId, {
            method: 'POST',
            headers: {'Content-Type':'application/json','x-authorization':userData.accessToken},
            body: JSON.stringify(profilePic)
        })
    }
}