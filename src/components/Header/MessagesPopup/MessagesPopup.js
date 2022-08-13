import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import {markAsRead, getRecentMessages } from "../../../services/messageServices";
import styles from "../css/header.module.css"

export const MessagesPopup = ({messages, onMessageHandler, setErrorsHandler, userData, onCheckRead}) => {
    const [showMessages, setShowMessages] = useState(false)
    const [unreadMessages, setUnreadMessages] = useState(messages.length)
    const onMessagesClick = () => setShowMessages(!showMessages)
    useEffect(() => {
        let unreadCount = messages.filter(message => !message.read).length
        setUnreadMessages(
            previousUnread => messages.length
            )
   }, [messages])

   useEffect(() => {
     if(!showMessages && messages.length > 0){
        let messagesToMark = messages.filter(message => !message.read).map(message => message._id)
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
        ? <ul className={styles.notifications_list}>
               {messages.map(message => 
               <li className={styles.notification}>
                    <div className={styles.single_notification_container}>
                        <img src={message.sender.image} />
                        <p>{message.sender.username}</p>
                        <p>
                            {message.content}
                        </p>
                       <button 
                       className={styles.check_read_btn}
                       onClick={() => onCheckRead(userData._id, message._id)}
                       >
                        <i class="fa-solid fa-check"></i>
                        </button>
                    </div>
            </li>
             )}
            </ul>
            : <h3>No new messages</h3>
        }
            <Link to={'/all-messages'}>See all messages</Link>
        </div>
      </div>
    </>
    )
}