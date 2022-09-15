import { useState, useEffect, useContext, useCallback } from "react"
import { useShoppingCart } from "../../hooks/useShoppingCart"
import {authContext} from "../../contexts/authContext"
import {getForShoppingCart} from "../../services/publicationServices"
import {sendNotification} from "../../services/notificationServices"
import styles from "./css/shoppingCart.module.css"
import { ProductArticle } from "./ProductArticle"
import {SuccessModal} from "./SuccessModal/SuccessModal"
import {ErrorAlert} from "../Alerts/Error"

export const ShoppingCart = () => {
const [products, setProducts] = useState([])
const [items, createCart, addToCart, removeFromCart, deleteCart] = useShoppingCart()
const [showSuccessModal, setShowSuccessModal] = useState(false)
const [errors, setErrors] = useState([])
const [prices , setPrices] = useState({
  totalPrice : '',
  IndividualProductPrices : [],
})
const {_, authData, __} = useContext(authContext)

const onRemoveHandler = (productId) => {
  removeFromCart(productId, ``, true)
}

const onBuyHandler = useCallback((products, userId) => {
  
    let owners = products.map(product => product.owner)
  
     let notificationsToSend = []
     owners.forEach(owner => {
      let notificationData = {
        type : 'buy',
        sender : userId,
        receiver : owner._id,
        publicationsToBuy : products.map(product => {
          if(owner._id === product.owner._id){
            return {_id : product._id, quantityToBuy : items.find(item => item._id === product._id).quantity}
          }
        })
      }
      notificationsToSend.push(notificationData)
    })
     sendNotification(notificationsToSend)
     .then(() => {
      products.forEach(product => {
        removeFromCart(product._id, ``, true)
        setShowSuccessModal(true)
      })
     })
     .catch(err => setErrors(oldErrors => [...oldErrors, err]))
  
},[products])


const onCloseHandler = () => setShowSuccessModal(false)

const calculateTotalPrice = (products, items) => {
  let totalPrice = products.reduce((sum, product) => sum += product.price * items.find(item => item._id === product._id).quantity , 0) 
  return totalPrice
} 
const calculateIndividualPrices = (products, items) => {
  let individualPrices = []
  for(let item of items){
    let individualPriceTotal = products.find(product => product._id === item._id).price * item.quantity
    let _id = item._id
    individualPrices.push({individualPriceTotal, _id})
  }
  return individualPrices
}

useEffect(() => {
    if(items.length > 0){
        let itemIds = items.map(item => item._id)
        getForShoppingCart(itemIds)
        .then(products => {
          setProducts(products)
          setPrices(oldPrices => {
           return {
              totalPrice : calculateTotalPrice(products, items),
              IndividualProductPrices : calculateIndividualPrices(products, items)
             }
          })
        })
        .catch(err => setErrors(oldErrors => [...oldErrors, err]))
    }
    else {
      products.length > 0 && setProducts([])
    }
}, [items])


return(
<>
{errors.length > 0 && <ErrorAlert errors={errors} />}
{showSuccessModal && <SuccessModal onCloseHandler={onCloseHandler} />}
  <header id={styles['site-header']}>
    <div className={styles.container}>
      <h1>
        Shopping cart 
      </h1>
    </div>
  </header>
  <div className={styles.container}>
    <section id={styles.cart}>
      {products.length > 0
       ? products.map(product => <ProductArticle 
        key={product._id} 
        product={{...product, quantity:items.find(item => item._id == product._id).quantity}} 
        prices={prices.IndividualProductPrices}
        onRemoveHandler={onRemoveHandler}
        />
        )
       : <h1 className={styles.no_added_header}>No items added to the cart yet... </h1>
      }
    </section>
  </div>
  {products.length > 0 && <footer id={styles['site-footer']}>
    <div className={styles.container + ' ' + styles.clearfix}>
      <div className={styles.right}>
          {prices.totalPrice > 0 &&  <h1 className={styles.total}> Total: <span>{prices.totalPrice}</span>$ </h1>}
        <a className={styles.btn} onClick={() => onBuyHandler(products, authData._id)}>Buy</a>
      </div>
    </div>
  </footer>
}
</>

    )
}