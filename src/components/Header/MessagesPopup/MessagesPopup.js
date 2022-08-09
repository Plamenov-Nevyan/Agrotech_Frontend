import userEvent from "@testing-library/user-event";
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import {markAsRead, getRecentMessages } from "../../../services/messageServices";
import styles from "../css/header.module.css"

export const MessagesPopup = ({messages, onMessageHandler, setErrorsHandler, userData}) => {
    const [showMessages, setShowMessages] = useState(false)
    const [unreadMessages, setUnreadMessages] = useState(0)
  
    const onMessagesClick = () => setShowMessages(!showMessages)

   useEffect(() => {
    if(messages.length > 0){
        let unreadCount = messages.filter(message => !message.read).length
        
        setUnreadMessages(
            previousUnread => unreadCount === 0 
            ? 0 
            : unreadCount === previousUnread 
               ? previousUnread
               : previousUnread + unreadCount
            )
    }
   }, [messages])

   useEffect(() => {
     if(!showMessages && messages.length > 0){
        let messagesToMark = messages.filter(message => !message.read).map(message => message._id)
        console.log(messagesToMark)
        if(messagesToMark.length > 0){
        markAsRead(messagesToMark, userData._id)
        .then(updatedMessages =>{
             onMessageHandler(``, updatedMessages)
            })
        .catch(err => setErrorsHandler(err.message))
        }
     }
   }, [showMessages])

    return(
        <>
         <button className={styles.menu_link} onClick={onMessagesClick}>
                 Messages <i className="fa-regular fa-message"></i>
                 {unreadMessages !== 0 && <span className={styles.badge_message}>{unreadMessages}</span>}
         </button>
    <div className={showMessages
       ? styles.notifications_container
       : styles['notifications_container-hidden']
    }>
      <div className={styles.notifications_list_holder}>
    {messages.length > 0
        ?<> 
            <ul className={styles.notifications_list}>
               {messages.map(message => 
               <li className={styles.notification}>
                <Link to={`/all-messages/${message._id}`}>
                    <div className={styles.single_notification_container}>
                        <img src={message.sender.image} />
                        <p>{message.sender.username}</p>
                        <p>
                            {message.content}
                        </p>
                        {!message.read && <button className={styles.check_read_btn}><i class="fa-solid fa-check"></i></button>}
                    </div>
                </Link>
            </li>
             )}
            </ul>
            <Link to={'/all-messages'}>See all messages</Link>
        </>
        :   <h3>No new messages</h3>
    }
      </div>
    </div>
        </>
    )
}