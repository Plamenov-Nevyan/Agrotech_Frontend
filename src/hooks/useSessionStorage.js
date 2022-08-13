import { useState } from "react"

export const useSessionStorage = () => {
  const [storedBrowserData, setStoredData] = useState(() => {
  return  {
    session : JSON.parse(sessionStorage.getItem('session')),
  } 
  })

  const setToStorage = (key, data) => {
    sessionStorage.setItem(key, JSON.stringify(data))
    setStoredData(oldData => {
      return {
        ...oldData,
        [key]:data
      }
  
    })
  }
  const clearFromStorage = (key) =>{
    sessionStorage.removeItem(key)
    setStoredData(oldData => {
      let newData = {
        ...oldData,
        [key]:null
      }
      return newData
    })
  }

  const getFromStorage = (key) => {
    let data = sessionStorage.getItem(key)
    return JSON.parse(data)
  }



  return [storedBrowserData, setToStorage, clearFromStorage, getFromStorage]
}