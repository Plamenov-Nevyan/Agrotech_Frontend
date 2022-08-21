import { useParams } from "react-router-dom"
import { useState, useEffect } from 'react'
import styles from "./css/notifications.module.css"
import { constants } from "../../config/constants"
import { getUserNotificationsOnLoad } from "../../services/notificationServices"
import { NotificationBlock } from "./NotificationBlock"
import { ErrorAlert } from "../Alerts/Error"
import { SmallLoadingSpinner } from "../SmallLoadingSpinner/SmallLoadingSpinner"


export const AllNotifications = () => {
  // Set state for notifications data received by the back-end
  const [notificationsData, setNotificationsData] = useState({})
  // Set state for the sorting type chosen by the user(default : most recent)
  const [sortType, setSortType] = useState('desc')
  // Set state for errors if they exist that are passed to the error alert
  const [errors, setErrors] = useState([])
  let { userId } = useParams()
  
  useEffect(() => {
    // Get the initial load of notifications at component mount, without skipping any
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
    // Load new notifications on every click of the 'Load more activity' button, with skipping the count of already loaded ones
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

  // Change sorting type through the select element
  const onSortTypeChange = (e) => setSortType(e.target.value)

  let sortedNotifications = []
 if(Object.values(notificationsData).length > 0){
  // Get the loaded notifications and sort them(client-side), if their count is 0, just slice and move on

  sortedNotifications = notificationsData.notifications.length > 0 
  ? notificationsData.notifications.sort((a,b) => sortType === 'desc' 
     ? Date.parse(b.createdAt) - Date.parse(a.createdAt)
     : Date.parse(a.createdAt) - Date.parse(b.createdAt)
  )
  : notificationsData.notifications.slice(0)
 }

//  Set variables for conditional rendering
 let areThereErrors = errors.length > 0
 let isThereNotificationsPresent 
 let isThereLoadedData = Object.values(notificationsData).length > 0
 isThereLoadedData ? isThereNotificationsPresent = notificationsData.notifications.length > 0 : isThereNotificationsPresent = false

  return (
    <>
    {areThereErrors && <ErrorAlert errors={errors} />}
    <section className={styles['section-50']}>
      <div className={styles.container}>
        <h3 className={styles['m-b-50'] + " " + styles['heading-line']}>
          Notifications <i className="fa fa-bell text-muted" />
        </h3>
        <div>
          {isThereLoadedData
            ? isThereNotificationsPresent && 
                <select 
                  className={styles.sort_notifications}
                  name="sortNotifications" 
                  value={sortType}
                  onChange={(e) => onSortTypeChange(e)}
                  >
                    <option value="desc">Most Recent</option>
                    <option value="asc">Oldest</option>
                </select>   
            : null
          }
        </div>
        {isThereLoadedData 
          ? isThereNotificationsPresent
             ? <div className={styles['notification-ui_dd-content']}>
                  {sortedNotifications.map(notification => <NotificationBlock notification = {notification} />) }
              </div>
           : <h1 className={styles.not_available}>No notifications yet...</h1>
        : <SmallLoadingSpinner />
        }
        <div className={styles['text-center']}>
          {" "}
          {isThereLoadedData
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