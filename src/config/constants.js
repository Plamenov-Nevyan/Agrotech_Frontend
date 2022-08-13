
export const constants = {
publicationsPerRequest : 8,
commentsPerPage : 10,
notificationsPerRequest : 10,
socket_url : 'http://localhost:5000',
notificationTypes : {
    like : 'liked your publication',
    follow : 'followed your publication',
    comment : 'commented your publication',
    edit : 'edited his/her publication',
    delete : 'deleted his/her publication',
    buy : 'wants to buy products from you',
    partiallySelled : 'have selled some products from this publication',
    soldOut : 'have selled all of the available products'
}
}