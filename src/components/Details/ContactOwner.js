import { useState } from "react"
import styles from "./css/details.module.css"
import { sendMessage } from "../../services/messageServices"

export const ContactOwner = ({owner, contactMethod, userData, setErrors}) => {
    const [message, setMessage] = useState('')
    const [showSuccessModal, setShowSuccessModal] = useState(false)

    const onMessageChange = (e) => setMessage(e.target.value)

 const sendAContactMessage = (e) => {
    e.preventDefault()
    let data = {
        sender : userData._id,
        receiver : owner._id,
        content : message,
    }
    sendMessage(data, userData.accessToken)
    .then((resp) => console.log(resp))
    .catch(err => console.log(err))
 }

if(contactMethod === 'phone'){
    return(
        <div id="contact-info">
        <img className={styles.owner_img} src={owner.image} />
        <p>{owner.username}'s phone number : {owner.phoneNumber ? owner.phoneNumber : owner.uic}
        <i class="fa fa-phone" aria-hidden="true"></i>
        </p>
        </div>
    )    
}
else if(contactMethod === 'message'){
    return(
        <form>
           <textarea className={styles.buy_message_area} 
           id="buy-message" 
           name="buy-message" 
           placeholder="Enter a message"
           value = {message}
           onChange={(e) => onMessageChange(e)}
           >
           </textarea>
           <button className={styles.send_buy_msg_btn} onClick={(e) => sendAContactMessage(e)}>Send</button>
        </form>
    )
}
else if(contactMethod === 'email') {
    return(
        <form>
        <h4>Send an email to {owner.email}</h4>
        <textarea className={styles.buy_message_area} id="buy-email" name="buy-email" placeholder="Enter the email content">
        </textarea>
        <button className={styles.send_buy_msg_btn}>Send</button>
       </form>
    )
}
}

