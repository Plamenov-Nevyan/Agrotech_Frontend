import styles from "./css/details.module.css"

export const ContactOwner = ({owner}) => {
   
    return (
        <div>
        <img className={styles.owner_img} src={owner.profilePic || `https://drive.google.com/uc?export=view&id=1iMt8_whGlwVVfGofzNKVf7O9bwrNdjnt`}>
        </img>
         <div id="contact-info">
             <p>{owner.email}</p>
             <p>{owner.phoneNumber ? owner.phoneNumber : owner.uic}</p>
         </div>
        <form>
           <textarea className={styles.buy_message_area} id="buy-message" name="buy-message" placeholder="Enter a message, or contact the owner through the other means">
           </textarea>
           <button className={styles.send_buy_msg_btn}>Send</button>
        </form>
        </div>
    )
}

