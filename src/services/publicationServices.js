import { getSession} from "../utils/getUserSession"
import {convertToFormData} from "../utils/convertToFormData"

const baseUrl = 'http://localhost:5000'
const endpoints = {
    CREATE_PUBLICATION :'/publications/create',
    GET_PUBLICATIONS : '/publications/marketplace', 
    GET_BY_ID : '/publications/marketplace/',
    LIKE : '/publications/like/',
    COMMENT : '/publications/add-comment/',
    GET_MOST_RECENT : '/publications/most-recent',
}

export  const createPublication = async(publicationData) => {
   let userData = getSession()
   if(!userData){throw {message : 'You are unauthorized to complete this action!'}}

   let formData = convertToFormData(publicationData)

   try{
    let resp = await fetch(baseUrl + endpoints.CREATE_PUBLICATION, {
        method: 'POST',
        headers: {'X-Authorization':userData.accessToken},
        body: formData
     })
     console.log(resp)
    if(resp.status !== 203){
      let error = await resp.json()
      throw error
    }
   }
   catch(err){
      throw {message : err.message}
   }
}

export const getLimitedPublications = async (skip, limit, category, searchParam) => {
   const queryPagination = `?skip=${skip}&limit=${limit}`
   const queryFilter = searchParam ?`&search=${searchParam}` : `&category=${category}`
   let resp = await fetch(baseUrl + endpoints.GET_PUBLICATIONS + queryPagination + queryFilter)
   let publicationsData = await resp.json()
   return publicationsData
}

export const getTotalCount = async () => {
   const query = '?count'
   let resp = await fetch(baseUrl + endpoints.GET_PUBLICATIONS + query)
   let count = await resp.json()
   return count
}

export const getDetails = async(publicationId) => {
   let resp = await fetch(baseUrl + endpoints.GET_BY_ID + publicationId)
   let publicationDetails = await resp.json()
   return publicationDetails
}

export const getMostRecent = async() => {
   let resp = await fetch(baseUrl + endpoints.GET_MOST_RECENT)
   let publications = await resp.json()
   return publications
}

export const likeOrFollow = async (publicationId, action) => {
     let user = getSession()
     if(!user){throw {message : 'Unauthorized !'}}
    let resp = await fetch(baseUrl + endpoints.LIKE + publicationId, {
      method: 'POST',
      headers: {'Content-Type' : 'application/json', 'x-authorization' : user.accessToken},
      body: JSON.stringify({userId:user._id, action})
     })
     let data = await resp.json()
     return data
}


export const searchPublications = (searchParam) => {
     const query = `?search=${searchParam}`
     fetch(baseUrl + endpoints.GET_PUBLICATIONS + query)
     .then(resp => resp.json())
}