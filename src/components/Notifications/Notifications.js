import styles from "./css/notifications.module.css"
import { Notification } from "./Notification"
import user1 from "./images/users/user1.jpg"
import user2 from "./images/users/user2.jpg"
import user3 from "./images/users/user3.jpg"
import user4 from "./images/users/user4.jpg"
import random1 from "./images/features/random1.jpg"
import random2 from "./images/features/random2.jpg"
import random3 from "./images/features/random3.jpg"
import random4 from "./images/features/random4.jpg"

export const Notifications = () => {
    return (
        <section className={styles['section-50']}>
  <div className={styles.container}>
    <h3 className={styles['m-b-50'] + " " + styles['heading-line']}>
      Notifications <i className="fa fa-bell text-muted" />
    </h3>
    <div className={styles['notification-ui_dd-content']}>
      <Notification user1={user1} random1={random1}/>
    </div>
    <div className={styles['text-center']}>
      {" "}
      <a href="#" className={styles['btn'] + " " + styles['btn-success']}>
        Load more activity
      </a>{" "}
    </div>
  </div>
</section>

    )
}