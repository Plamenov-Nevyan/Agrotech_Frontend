import { useParams } from "react-router-dom"
import { useState, useEffect } from 'react'
import styles from "./css/notifications.module.css"
import { constants } from "../../config/constants"
import { getUserNotificationsOnLoad } from "../../services/notificationServices"
import { NotificationBlock } from "./NotificationBlock"
import { ErrorAlert } from "../Alerts/Error"
import { SmallLoadingSpinner } from "../SmallLoadingSpinner/SmallLoadingSpinner"


export const AllNotifications = () => {
  const [notificationsData, setNotificationsData] = useState({})
  const [sortType, setSortType] = useState('desc')
  const [errors, setErrors] = useState([])
  let { userId } = useParams()
  
  useEffect(() => {
    const getInitial = async() => {
      try{
        let notificationsDataReceived = await getUserNotificationsOnLoad(
          0, 
          constants.notificationsPerRequest, 
          sortType,
          userId
          )
          setNotificationsData(notificationsDataReceived)
      }catch(err){
        setErrors(oldErrors => [...oldErrors, err.message])
      }
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
      .catch(err =>  setErrors(oldErrors => [...oldErrors, err.message]))
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
    <>
    {errors.length > 0 && <ErrorAlert errors={errors} />}
    <section className={styles['section-50']}>
      <div className={styles.container}>
        <h3 className={styles['m-b-50'] + " " + styles['heading-line']}>
          Notifications <i className="fa fa-bell text-muted" />
        </h3>
        <div>
          {Object.values(notificationsData).length > 0
            ? notificationsData.notifications.length > 0 && <select 
              name="sortNotifications" 
              value={sortType}
              onChange={(e) => onSortTypeChange(e)}
              >
                <option value="desc">Most Recent</option>
                <option value="asc">Oldest</option>
              </select>   
            :null
          }
        </div>
        {Object.values(notificationsData).length > 0
          ? notificationsData.notifications.length > 0
             ? <div className={styles['notification-ui_dd-content']}>
                  {sortedNotifications.map(notification => <NotificationBlock notification = {notification} />) }
              </div>
           : <h1 className={styles.not_available}>No notifications yet...</h1>
        : <SmallLoadingSpinner />
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
    </>
  )
}