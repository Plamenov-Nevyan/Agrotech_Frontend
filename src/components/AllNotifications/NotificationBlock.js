import styles from "./css/notifications.module.css"
import {Link} from "react-router-dom"

export const NotificationBlock = ({notification}) => {
    return (
        <div className={styles['notification-list'] + " " + styles['notification-list--unread']}>
        <div className={styles['notification-list_content']}>
          <div className={styles['notification-list_img']}>
            {" "}
            <img src={notification.sender.image} alt="user" />{" "}
          </div>
          <div className={styles['notification-list_detail']}>
            <p>
              <b>{notification.sender.username}</b> 
               <Link to={`/catalogue/details/${notification.forPublication._id}`}>{notification.content}</Link>
            </p>
            <p className={styles['text-muted']}>
              Notification about <span>
                  {notification.forPublication.name && `${notification.forPublication.name}`}
                  {notification.forPublication.model && `${notification.forPublication.model}`}
                  {notification.forPublication.serviceType && `${notification.forPublication.serviceType}`}
                </span>
            </p>
            <p className={styles['text-muted']}>
              <small>{notification.createdAt}</small>
            </p>
          </div>
        </div>
        <div className={styles['notification-list_feature-img']}>
          {" "}
          {notification.type === 'like' && <img src="/like.png" alt="Feature image" />}
          {notification.type === 'follow' && <img src="/follow.png" alt="Feature image" />}
        </div>
      </div>
    )
}