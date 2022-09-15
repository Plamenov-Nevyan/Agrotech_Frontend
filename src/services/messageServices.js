const baseUrl = 'https://agro-tech-market.herokuapp.com/messages'
const endpoints = {
    GET_RECENT : '/get-recent/',
    MARK_AS_READ : '/read/',
    SEND : '/send/',
    RECENT_FROM_UNIQUE_SENDERS : '/get-recent-chat/',
    GET_TRANSCRIPT : '/get-transcript/',
    CHECK_FOR_NEW : '/check-new/',
    DELETE : '/delete',
    SEND_EMAIL : '/contact-by-email'
}

export const getMostRecentFromUniqueSenders = (userId) => {
   return fetch(baseUrl + endpoints.RECENT_FROM_UNIQUE_SENDERS + userId)
   .then(resp => resp.json())
}

export const getRecentMessages = (userId) => {
    return fetch(baseUrl + endpoints.GET_RECENT + userId)
    .then(resp => resp.json())
}

export const markAsRead = (messagesId, userId) => {
    return fetch(baseUrl + endpoints.MARK_AS_READ + userId, {
     method : 'POST',
     headers : {'content-type' : 'application/json'},
     body : JSON.stringify({data : messagesId})
    })
    .then(resp => resp.json())
 }

export const sendMessage = (data, senderAccessToken) => {
    return fetch(baseUrl + endpoints.SEND + data.receiverId, {
        method : 'POST',
        headers : { 'Content-Type' : 'application/json' ,'X-Authorization' : senderAccessToken},
        body : JSON.stringify(data)
    })
}

export const getTranscript = (contactId, userId) => {
    return fetch(baseUrl + endpoints.GET_TRANSCRIPT + contactId + '/' + userId)
    .then(resp => resp.json())
}

export const sendEmail = (sender, subject, content) => {
   return fetch(baseUrl + endpoints.SEND_EMAIL, {
    method : 'POST',
    headers : {'Content-Type' : 'application/json'},
    body : JSON.stringify({
        sender,
        subject,
        content
    })
   })
   .then(resp => resp.json())
}
