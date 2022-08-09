import { useParams } from "react-router-dom"
import { useState, useEffect } from 'react'
import styles from "./css/notifications.module.css"
import { constants } from "../../config/constants"
import { getUserNotificationsOnLoad } from "../../services/notificationServices"
import { NotificationBlock } from "./NotificationBlock"

export const AllNotifications = () => {
  const [notificationsData, setNotificationsData] = useState({})
  const [sortType, setSortType] = useState('desc')
  let { userId } = useParams()
  
 
  useEffect(() => {
    const getInitial = async() => {
      let notificationsDataReceived = await getUserNotificationsOnLoad(
        0, 
        constants.notificationsPerRequest, 
        sortType,
        userId
        )
        console.log(notificationsDataReceived)
        setNotificationsData(notificationsDataReceived)
    }
    getInitial()
  }, [])

  const onLoadHandler = () => {
    getUserNotificationsOnLoad(
      notificationsData.notifications.length,
      constants.notificationsPerRequest, 
      userId
      )
      .then(( notificationsDataReceived) => setNotificationsData(currentData => {
        return { 
         notifications: [...currentData.notifications, ...notificationsDataReceived.notifications],
         count : currentData.count - notificationsDataReceived.count,
         noMoreRemaining : notificationsDataReceived.noMoreRemaining
          }
       })
      )
      .catch(err => console.log(err))
  }

  const onSortTypeChange = (e) => setSortType(e.target.value)

  let sortedNotifications = []
 if(Object.values(notificationsData).length > 0){
  sortedNotifications = notificationsData.notifications.length > 0 
  ? notificationsData.notifications.sort((a,b) => sortType === 'desc' 
     ? Date.parse(b.createdAt) - Date.parse(a.createdAt)
     : Date.parse(a.createdAt) - Date.parse(b.createdAt)
  )
  : notificationsData.notifications.slice(0)
 }

  return (
    <section className={styles['section-50']}>
      <div className={styles.container}>
        <h3 className={styles['m-b-50'] + " " + styles['heading-line']}>
          Notifications <i className="fa fa-bell text-muted" />
        </h3>
        <div>
          <select name="sortNotifications" value={sortType} onChange={(e) => onSortTypeChange(e)}>
             <option value="desc">Most Recent</option>
             <option value="asc">Oldest</option>
          </select>
        </div>
        {Object.values(notificationsData).length > 0
          ? notificationsData.notifications.length > 0
             ? <div className={styles['notification-ui_dd-content']}>
                  {sortedNotifications.map(notification => <NotificationBlock notification = {notification} />) }
              </div>
           : <h1>No notifications yet...</h1>
        : <h1>Loading...</h1>
        }
        <div className={styles['text-center']}>
          {" "}
          {Object.values(notificationsData).length > 0
             ? notificationsData.noMoreRemaining
                ? null
                : <button className={styles['btn'] + " " + styles['btn-success']} onClick={onLoadHandler}>
                     Load more activity
                 </button>
             : null
          }
        </div>
      </div>
    </section>

  )
}