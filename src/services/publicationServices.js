import { getSession} from "../utils/getUserSession"
import {convertToFormData} from "../utils/convertToFormData"

const baseUrl = 'http://localhost:5000'
const endpoints = {
    CREATE_PUBLICATION :'/publications/create',
    GET_PUBLICATIONS : '/publications/marketplace'
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
    let newPublication = await resp.json()
    console.log(newPublication)
    return newPublication
   }
   catch(err){
      throw {message : err.message}
   }
}

export const getLimitedPublications = async (skip, limit, sortType) => {
   const query = `?skip=${skip}&limit=${limit}&sort=${sortType}`
   let resp = await fetch(baseUrl + endpoints.GET_PUBLICATIONS + query)
   let publicationsData = await resp.json()
   return publicationsData
}

export const getTotalCount = async () => {
   const query = '?count'
   let resp = await fetch(baseUrl + endpoints.GET_PUBLICATIONS + query)
   let count = await resp.json()
   return count
}