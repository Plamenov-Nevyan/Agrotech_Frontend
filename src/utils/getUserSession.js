export const getSession = () => {
    let userDataSerialized = sessionStorage.getItem('session')
    if(userDataSerialized){
     let user = JSON.parse(userDataSerialized)
     return user
    }
    return null
}