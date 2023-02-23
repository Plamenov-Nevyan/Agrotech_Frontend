import {convertToFormData} from "../utils/convertToFormData"
const baseUrl = 'http://localhost:5000'
const endpoints = {
    GET_USER_INFO : '/users/profile/',
    ADD_PROFILE_PIC : '/users/add-prof-pic/',
    ADD_COVER_PIC: '/users/add-cover-pic/',
    ADD_DESCRIPTION: '/users/add-description/'
}

export const getUserProfile = async (userId) => {
    let resp = await fetch(baseUrl + endpoints.GET_USER_INFO + userId)
    let userInfo = await resp.json()
    return userInfo
}

export const addProfilePic = async(userData, profilePic) => {
    if(!userData){throw {message: 'Unauthorized !'}}
    else if(typeof profilePic === 'object'){
         let formData = new FormData()
         formData.append('file', profilePic)
        let resp = await fetch(baseUrl + endpoints.ADD_PROFILE_PIC + userData._id, {
            method: 'POST',
            headers: {'x-authorization':userData.accessToken},
            body: formData
        })
    }
    else {
        let resp = await fetch(baseUrl + endpoints.ADD_PROFILE_PIC + userData._id, {
            method: 'POST',
            headers: {'Content-Type':'application/json','x-authorization':userData.accessToken},
            body: JSON.stringify({profilePic})
        })
    }
}

export const addCoverPic = async (userData, coverPic) => {
    if(!userData){throw{message : 'Unauthorized'}}
    else if(typeof coverPic === 'object'){
        let formData = new FormData()
        formData.append('file', coverPic)
        let resp = await fetch(baseUrl + endpoints.ADD_COVER_PIC +userData._id, {
            method: 'POST',
            headers: {'X-authorization': userData.accessToken},
            body: formData
        })
    }
    else {
        let resp = await fetch(baseUrl + endpoints.ADD_COVER_PIC + userData._id, {
            method: 'POST',
            headers: {'Content-Type':'application/json','x-authorization':userData.accessToken},
            body: JSON.stringify({coverPic})
        })
    }
}

export const addDescription = async(userData, description) => {
    if(!userData){throw{message : 'Unauthorized'}}
    let resp = await fetch(baseUrl + endpoints.ADD_DESCRIPTION + userData._id, {
        method : 'POST',
        headers: {'Content-Type':'application/json','x-authorization':userData.accessToken},
        body: JSON.stringify({description})
    })
}