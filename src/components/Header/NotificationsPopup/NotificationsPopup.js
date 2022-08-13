import { useState, useEffect } from "react"
import {Link, useNavigate } from "react-router-dom"
import {markAsRead} from "../../../services/notificationServices";
import styles from "../css/header.module.css"
import { SellModal } from "./SellModal.js/SellModal";
import { ShowDeletedModal } from "./ShowDeletedModal/ShowDeletedModal";

export const NotificationsPopup = ({notifications, onNotificationHandler, setErrorsHandler, userData}) => {
    const [showNotifications, setShowNotifications] = useState(false)
    const [unreadNotifications, setUnreadNotifications] = useState(0)
    const [deletedPublication, setDeletedPublication] = useState({})
    const [publicationsToSell, setPublicationsToSell] = useState({})
    const [showDeletedModal, setShowDeletedModal] = useState(false)
    const [showSellModal, setShowSellModal] = useState(false)
    let navigate = useNavigate()
    
    const onNotificationsClick = () => setShowNotifications(!showNotifications)

   useEffect(() => {
    if(notifications.length > 0){
        let unreadCount = notifications.filter(notification => !notification.read).length
        setUnreadNotifications(
            previousUnread => unreadCount === 0 
            ? 0 
            : previousUnread + unreadCount
            )
    }
   }, [notifications])


   useEffect(() => {
     if(!showNotifications && notifications.length > 0){
        let notificationsToMark = notifications.filter(notification => !notification.read).map(notification => notification._id)
       if(notificationsToMark.length > 0){
        markAsRead(notificationsToMark)
        .then(updatedNotifications =>{
             onNotificationHandler(``, updatedNotifications)
            })
        .catch(err => setErrorsHandler(err.message))
       }
     }
   }, [showNotifications])

   const onCloseHandler = () => showDeletedModal ? setShowDeletedModal(false): setShowSellModal(false)

   const onDeletedNotifClick = (deletedPublicationFromNotif, notifSender, soldOutOrDeleted) => {
    deletedPublicationFromNotif.notifSender = notifSender
    setDeletedPublication(deletedPublicationFromNotif)
    setShowDeletedModal(true)
}

   const onBuyNotifClick = (publicationsToSell, notifSender) => {
     let data = {publicationsToSell, sender : notifSender}
     setPublicationsToSell(data)
     setShowSellModal(true)
   }

    return(
        <>
        {showSellModal && <SellModal 
        onCloseHandler={onCloseHandler} 
        sellData={publicationsToSell} 
        accessToken={userData.accessToken}
        userId={userData._id}
        />
        }
        {showDeletedModal && <ShowDeletedModal 
        onCloseHandler={onCloseHandler} 
        publication={deletedPublication} 
        sender={deletedPublication.notifSender}
        />
        }
        <button className={styles.menu_link} onClick={() => onNotificationsClick()}>
            Notifications <i className="fas fa-bell"></i>
            {unreadNotifications !== 0 && <span className={styles.badge_notification}>{unreadNotifications}</span>}
        </button>
    <div className={showNotifications
       ? styles.notifications_container
       : styles['notifications_container-hidden']
    }>
      <div className={styles.notifications_list_holder}>
          {notifications.length > 0
        ? <ul className={styles.notifications_list}>
               {notifications.map(notification => 
               <li className={styles.notification}>
               { notification.type !== 'delete' && notification.type !== 'buy'
               ? <Link to={`/catalogue/details/${notification.forPublication}`}>
                    <div className={styles.single_notification_container}>
                        <img src={notification.sender.image} />
                        <p>{notification.sender.username}
                         {notification.content} 
                        </p>
                        <p>
                            On {notification.createdAt.split('T')[0]}
                        </p>
                        {!notification.read && <button className={styles.check_read_btn}><i class="fa-solid fa-check"></i></button>}
                    </div>
                </Link>
                : <div 
                    className={styles.single_notification_container} 
                    onClick = { notification.type === 'delete'
                     ? () => onDeletedNotifClick(notification.deletedPublication, notification.sender)
                     : () => onBuyNotifClick(notification.publicationsToBuy, notification.sender)
                    }
                    >
                        <img src={notification.sender.image} />
                        <p>{notification.sender.username}
                        {notification.content} 
                        </p>
                        <p>
                            On {notification.createdAt.split('T')[0]}
                        </p>
                        {!notification.read && <button className={styles.check_read_btn}><i class="fa-solid fa-check"></i></button>}
                    </div>
                }
            </li>
             )}
            </ul>
        :  <h3>No new notifications</h3>
    }
    <button className={styles.seeAll} onClick={() => {navigate(`/notifications/see-all/${userData._id}`)}}> See all notifications</button>
      </div>
    </div>
        </>
    )
}