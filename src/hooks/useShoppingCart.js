import { useState} from "react"

export const useShoppingCart = () => {
    const [items, setItems] = useState(JSON.parse(localStorage.getItem('shoppingCart')) || [])

const createCart = () => localStorage.setItem('shoppingCart', JSON.stringify([]))

const addToCart = (itemId, quantity) => {
    let itemToProcess = items.find(item => item._id === itemId)

    let updatedItems

    if(itemToProcess){
        let itemIndex = items.indexOf(itemToProcess)
        itemToProcess.quantity = quantity
        updatedItems = items.splice(itemIndex,1,itemToProcess)
    }
    else{
        updatedItems = itemToProcess ? [...items]  : [...items, {_id : itemId, quantity}]
    }

    localStorage.setItem('shoppingCart', JSON.stringify(updatedItems))
    setItems(oldItems =>  [...updatedItems])

   } 

const removeFromCart = (itemId, quantity, removeAll) => {
       let itemToProcess = items.find(item => item._id === itemId)
       let indexOfItem = items.indexOf(itemToProcess)
       let updatedItems 
      if(removeAll){
        updatedItems = [...items.filter(item => item._id !== itemToProcess._id)]
      }
      else if(quantity){
        if(Number(quantity) == itemToProcess.quantity){
            updatedItems = [...items.filter(item => item._id !== itemToProcess._id)]
        }
        else {
            itemToProcess.quantity -= quantity
            updatedItems = items.splice(indexOfItem, 1, itemToProcess)
           }
      }
       localStorage.setItem('shoppingCart', JSON.stringify(updatedItems))
       return updatedItems
    }
  
   const deleteCart = () => {
    localStorage.removeItem('shoppingCart')
    setItems([])
   }
    return [items, createCart, addToCart, removeFromCart, deleteCart]
}