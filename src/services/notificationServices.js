import { constants}  from "../config/constants"

const baseUrl = 'http://localhost:5000/notifications'
const endpoints = {
    GET_ALL : '/get-all/',
    GET_RECENT: '/get-recent/',
    SEND : '/send',
    MARK_AS_READ : '/read'
}



export const getUserNotificationsOnLoad = (skip, limit, sort, userId) => {
    const query = `?skip=${skip}&limit=${limit}&sort=${sort}`
    return fetch(baseUrl + endpoints.GET_ALL + userId + query)
    .then(resp => resp.json())
}

export const getUserNotifications = (userId) => {
    return fetch(baseUrl + endpoints.GET_RECENT + userId)
    .then(resp => resp.json())
}

export const sendNotification = (notificationData) => {

    if(Array.isArray(notificationData)){
        notificationData.forEach(notification => notification.content = constants.notificationTypes[notification.type])
    }
    else{
        notificationData.content = constants.notificationTypes[notificationData.type]
    }
    return fetch(baseUrl + endpoints.SEND, {
        method : 'POST',
        headers: {'content-type': 'application/json'},
        body : JSON.stringify(notificationData)
    })
    .then((resp) => resp.json())
}

export const markAsRead = (notificationsId) => {
   return fetch(baseUrl + endpoints.MARK_AS_READ, {
    method : 'POST',
    headers : {'content-type' : 'application/json'},
    body : JSON.stringify(notificationsId)
   })
   .then(resp => resp.json())
}