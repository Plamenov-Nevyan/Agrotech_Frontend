import { useNavigate } from "react-router-dom"
import { deletePublication } from "../../../services/publicationServices"
import { sendNotification } from "../../../services/notificationServices"

import styles from "../css/confirmModal.module.css"

export const ConfirmModal = ({onCloseHandler, onErrorHandler, accessToken,publicationId, followers, owner}) => {
const navigate = useNavigate()

const onDeleteHandler = () => {
   deletePublication(publicationId, accessToken)
   .then(async (deletedPublication) => {
    try {
      let notificationsToSend = []
      for(let follower of followers){
         let notificationData = { 
            type : 'delete', 
            receiver : follower._id,
            sender : owner._id, 
            deletedPublication,
            read : false
          }
          notificationsToSend.push(notificationData)
      }
      await sendNotification(notificationsToSend)
      onCloseHandler()
      navigate('/catalogue', {state:{showSuccessAlert:true, username: owner.username}})
    }catch(err){
      throw err
    }
    
})
   .catch(err => {
      onCloseHandler()
      onErrorHandler(err.message)
   })
}

     return (
     <>
          <div id="popup1" className={styles.overlay} onClick={() => onCloseHandler()}>
          <div className={styles.popup}>
          <h2>Confirm Delete</h2>
          <a className={styles.close} onClick={() => onCloseHandler()}>&times;</a>
          <div className={styles.content}>
             <p className={styles.content_p}>Are you sure you want to delete this publication ?</p>
             <div className={styles.link_holder}>
                <button onClick={(e) => onDeleteHandler(e)}>Yes</button>
                <button onClick={() => onCloseHandler()}>Cancel</button>
             </div>
          </div>
        </div>
        </div>
     </>
     )
 }