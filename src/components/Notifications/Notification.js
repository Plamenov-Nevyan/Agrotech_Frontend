import styles from "./css/notifications.module.css"

export const Notification = (props) => {
    return (
        <div className={styles['notification-list'] + " " + styles['notification-list--unread']}>
        <div className={styles['notification-list_content']}>
          <div className={styles['notification-list_img']}>
            {" "}
            <img src={props.user1} alt="user" />{" "}
          </div>
          <div className={styles['notification-list_detail']}>
            <p>
              <b>Aryan</b> reacted to your post
            </p>
            <p className={styles['text-muted']}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde,
              dolorem.
            </p>
            <p className={styles['text-muted']}>
              <small>10 mins ago</small>
            </p>
          </div>
        </div>
        <div className={styles['notification-list_feature-img']}>
          {" "}
          <img src={props.random1} alt="Feature image" />{" "}
        </div>
      </div>
    )
}