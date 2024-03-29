import {convertToFormData} from "../utils/convertToFormData"

const baseUrl = 'http://localhost:5000'
const endpoints = {
    CREATE_PUBLICATION :'/publications/create',
    GET_PUBLICATIONS : '/publications/marketplace', 
    GET_BY_ID : '/publications/marketplace/',
    LIKE : '/publications/like/',
    COMMENT : '/publications/add-comment/',
    GET_MOST_RECENT : '/publications/most-recent',
    EDIT : '/publications/edit/',
    DELETE : '/publications/delete/',
    GET_FOR_SHOPPING_CART : '/publications/get-for-shopping-cart',
    GET_FOR_SELL : '/publications/get-for-sell',
    SELL : '/publications/sell/'
}

export  const createPublication = async(publicationData, authData) => {
   console.log(authData)
   if(authData === null){throw new Error('You are unauthorized to complete this action!')}

   let formData = convertToFormData(publicationData)


   try{
    let resp = await fetch(baseUrl + endpoints.CREATE_PUBLICATION, {
        method: 'POST',
        headers: {'X-Authorization':authData.accessToken},
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

export const getLimitedPublications = async (sort,skip, limit, category, searchParam) => {
   const queryPagination = `?skip=${skip}&limit=${limit}&sort=${sort}`
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

export const likeOrFollow = async (publicationId, action, userData) => {
     if(!userData){throw {message : 'Unauthorized !'}}
    let resp = await fetch(baseUrl + endpoints.LIKE + publicationId, {
      method: 'POST',
      headers: {'Content-Type' : 'application/json', 'x-authorization' : userData.accessToken},
      body: JSON.stringify({userId:userData._id, action})
     })
     let data = await resp.json()
     console.log(data)
     return data
}


export const searchPublications = (searchParam) => {
     const query = `?search=${searchParam}`
     fetch(baseUrl + endpoints.GET_PUBLICATIONS + query)
     .then(resp => resp.json())
}

export const editPublication = (publicationData, publicationId, accessToken) => {

   return fetch(baseUrl + endpoints.EDIT + publicationId, {
      method : 'PUT',
      headers : {'Content-Type' : 'application/json', 'X-Authorization' : accessToken},
      body : JSON.stringify(publicationData)
   })
}

export const deletePublication = (publicationId, accessToken) => {
   return fetch(baseUrl + endpoints.DELETE + publicationId, {
     method : 'DELETE',
     headers : {'X-Authorization' : accessToken}
   })
   .then(resp => resp.json())
}

export const getForShoppingCart = (itemIds) => {
   let query = `?itemIds=${itemIds}`
   return fetch(baseUrl + endpoints.GET_FOR_SHOPPING_CART + query)
   .then(resp => resp.json())
}

export const getForSell = (publicationIds) => {
   let query = `?publicationIds=${publicationIds}`
   return fetch(baseUrl + endpoints.GET_FOR_SELL + query)
   .then(resp => resp.json())
}

export const sellProduct = (publicationId, quantityToSell, accessToken, buyer) => {
   return fetch(baseUrl + endpoints.SELL + publicationId, {
      method : 'POST',
      headers : {'Content-Type' : 'application/json', 'X-Authorization' : accessToken},
      body : JSON.stringify({quantityToSell, buyer})
   })
   .then(resp => resp.json())
}