import styles from "./css/notifications.module.css"
import {Link} from "react-router-dom"

export const NotificationBlock = ({notification}) => {
  console.log(notification)
let about = ''
switch(notification.type){
  case 'delete' : about = notification.deletedPublication.name 
                  || notification.deletedPublication.model
                  || notification.deletedPublication.serviceType
                  ;break
  case 'buy' : about = 'publications to buy'; break
  default : about = notification.forPublication.name 
            || notification.forPublication.model
            || notification.forPublication.serviceType
            ;break
}

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
               {notification.type === 'soldOut' && <p>{notification.content}</p>}
               {notification.type === 'buy' && <p>{notification.content}</p>}
               {notification.type === 'delete' && <p>{notification.content}</p>}
               {notification.type == 'like' && notification.type == 'follow' && notification.type == 'comment' || notification.type == 'edit' && <Link 
               to={`/catalogue/details/${notification.forPublication._id}`}>{notification.content}</Link>}
            </p>
            <p className={styles['text-muted']}>
              Notification about <span>{about}</span>
            </p>
            <p className={styles['text-muted']}>
              <small>{notification.createdAt}</small>
            </p>
          </div>
        </div>
        <div className={styles['notification-list_feature-img']}>
          {" "}
          {notification.type === 'like' && <img src="https://drive.google.com/uc?export=view&id=Jz4YBkTtgP31_-hbso_g3H7Ueb2sl5NB" alt="Feature image" />}
          {notification.type === 'follow' && <img src="https://drive.google.com/uc?export=view&id=1jAlm5_IIDI1AkoZ7uZ4bsAiQhdX0kaei" alt="Feature image" />}
          {notification.type === 'comment' && <img src="https://drive.google.com/uc?export=view&id=1BbFKyC7pLI9pMtbLWiBSQ_0S-42IET4q" alt="Feature image" />}
          {notification.type === 'deleted' && <img src="https://drive.google.com/uc?export=view&id=1zlY45LO74hdGmyQGrySvYe-lblJ70m4e" alt="Feature image" />}
          {notification.type === 'partiallySelled' && <img src="https://drive.google.com/uc?export=view&id=1MlxeQ2FiKVais_WRTlMzssGmhCvu6aLR" alt="Feature image" />}
          {notification.type === 'soldOut' && <img src="https://drive.google.com/uc?export=view&id=123t8eHFKXSCyy6kAHmOgjKD3vFUIlqRB" alt="Feature image" />}
          {notification.type === 'buy' && <img src="https://drive.google.com/uc?export=view&id=1716xiz0lxMpsCUWEPCwrHDD0AhgCW0ba" alt="Feature image" />}
        </div>
      </div>
    )
}