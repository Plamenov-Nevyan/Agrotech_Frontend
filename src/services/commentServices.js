import {constants} from '../config/constants'
const baseUrl = 'http://localhost:5000'
const endpoints = {
    ADD_COMMENT : '/comments/add/',
    GET_COMMENTS : '/comments/get/',
    GET_COUNT : '/comments/count/'
}

export const addComment = async(publicationId, content, userId, accessToken) => {

    if(!userId){throw {message : 'Unauthorized !'}}
    return fetch(baseUrl + endpoints.ADD_COMMENT + publicationId, {
        method: 'POST',
       headers : {'Content-Type':'application/json', 'x-authorization': accessToken},
       body: JSON.stringify({author : userId, content})
    })
    .then(resp => resp.json())

    // let resp = await fetch(baseUrl + endpoints.COMMENT + publicationId, {
    //    method: 'POST',
    //    headers : {'Content-Type':'application/json', 'x-authorization': user.accessToken},
    //    body: JSON.stringify({author : user._id, content})
    // })
    // let comments = await resp.json()
    // return comments
 }

export const getComments = (page, publicationId, commentSortType) => {
    let query = `?skip=${(page - 1) * constants.commentsPerPage}&limit=${constants.commentsPerPage}&sort=${commentSortType}`
    return fetch(baseUrl + endpoints.GET_COMMENTS + publicationId + query)
    .then(resp => resp.json())
}

export const getCommentsCount = (publicationId) => {
    return fetch(baseUrl + endpoints.GET_COUNT + publicationId)
    .then(resp => resp.json())
}