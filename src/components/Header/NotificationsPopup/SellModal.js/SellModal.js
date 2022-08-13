import {useState} from "react"
import { useEffect } from "react"
import styles from "../../css/sellModal.module.css"
import { getForSell, sellProduct, deletePublication} from "../../../../services/publicationServices"
import { sendNotification } from "../../../../services/notificationServices"

export const SellModal = ({sellData, onCloseHandler, accessToken, userId}) => {
    const [populatedPublications, setPopulatedPublications] = useState([])
    useEffect(() => {
      let publicationIds = sellData.publicationsToSell.map(publication => publication._id)
      getForSell(publicationIds)
      .then((receivedPopulatedPublications) => setPopulatedPublications(receivedPopulatedPublications))
      .catch(err => console.log(err))
    },[])
     
   const onSellHandler = (publicationId, quantityToBuy) => {
      sellProduct(publicationId, quantityToBuy, accessToken, sellData.sender)
      .then(async(productForSell) => {
         let productFollowers = productForSell.followedBy
         let notifications = []
         productFollowers.forEach(follower => {
            if(productForSell.quantity > 0){
               let notificationData = {
                  receiver : follower,
                  sender : userId,
                  type : 'partiallySelled',
                  forPublication : publicationId,
                  read:false
               }
               notifications.push(notificationData)
            }
            else {
               let notificationData = {
                  receiver : follower,
                  sender : userId,
                  type : 'soldOut',
                  forPublication : productForSell._id,
                  read:false
               }
               notifications.push(notificationData)
            }
         })
         console.log(notifications)
         await sendNotification(notifications)
      })
   }

    return (
    <>
         <div id="popup1" className={styles.overlay} onClick={() => onCloseHandler()}>
         <div className={styles.popup}>
         <h2>{sellData.sender.username} wants to buy the following products from you</h2>
         <a className={styles.close} onClick={() => onCloseHandler()}>&times;</a>
         <div className={styles.content}>
            <ul className={styles.products_list}>
               {populatedPublications.length > 0 &&  populatedPublications.map(publication => 
               <li className={styles.product_li_item}>
                  <div className={styles.product_info}>
                     <img src={publication.image}/>
                     <h4>{publication.name}</h4>
                     <span> | </span>
                     <h5>Quantity wanted : {
                     sellData.publicationsToSell.find(publ => publ._id === publication._id).quantityToBuy
                     }</h5>
                     <span> | </span>
                     <button onClick={() => onSellHandler(
                        publication._id, 
                        sellData.publicationsToSell.find(publ => publ._id === publication._id).quantityToBuy
                        )}
                        >
                        Sell
                     </button>
                  </div>
                </li>)
               }
            </ul>
         </div>
       </div>
       </div>
    </>
    )
}