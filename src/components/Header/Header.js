import { useState, useEffect, useContext} from "react";
import { getUserNotifications} from "../../services/notificationServices";
import {getRecentMessages} from "../../services/messageServices"
import { authContext } from "../../contexts/authContext";
import styles from "./css/header.module.css"
import { Navbar } from "./Navbar/Navbar";
import { ConfirmModal } from "./ConfirmModal/ConfirmModal";
import { ErrorAlert } from "../Alerts/Error";
import { Link } from "react-router-dom";
import { NotificationsPopup } from "./NotificationsPopup/NotificationsPopup";
import { MessagesPopup } from "./MessagesPopup/MessagesPopup";


export const Header = () => {
  const [notifications, setNotifications] = useState([])
  const [messages, setMessages] = useState([])
  const [linksActive, setActivity] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [errors, setErrors] = useState([])
  const {_, authData, __} = useContext(authContext)

  useEffect(() => {
   const getNotificationsAndMessages = async () => {
    if(authData){
    try{ 
      let [receivedNotifications, receivedMessages] = await Promise.all([
      getUserNotifications(authData._id),
      getRecentMessages(authData._id)
     ])
     console.log(receivedNotifications)
     onNotificationHandler(``,receivedNotifications)
     onMessageHandler(``,receivedMessages)
    }catch(err){
      console.log(err)
    }
  }
}
   getNotificationsAndMessages()
}, [])

  function hamburgActiviyHandler(e){
    e.preventDefault()
    if(linksActive == false){
      onNotificationHandler(authData._id)
      onMessageHandler(authData._id)
      setActivity(true)
    
    }
    else{setActivity(false)}
  } 

  const onCloseHandler = () => setShowModal(false)

  const setErrorsHandler = (error) => {
    window.scrollTo({top:0,behavior:'smooth'})
    setErrors(errors => [...errors, error])
  }

  const logoutModalShow = (e) =>{ 
    e.preventDefault()
    setShowModal(true)
  }

  const onNotificationHandler = (userId, updatedNotifications) => {
    if(userId){
      getUserNotifications(userId)
        .then(receivedNotifications => {
          console.log(receivedNotifications)
          setNotifications(oldNotifications => [...receivedNotifications])
        })
        .catch(err => setErrorsHandler(err.message))
      }
      else if(updatedNotifications){
        setNotifications(oldNotifications => [...updatedNotifications])
      }
  }

  const onMessageHandler = (userId, updatedMessages) => {
    if(userId){
      getRecentMessages(userId)
        .then(receivedMessages => {
          setMessages(oldMessages => [...receivedMessages])
        })
        .catch(err => setErrorsHandler(err.message))
      }
      else if(updatedMessages){
        setMessages(oldMessages => [...updatedMessages])
      }
  }

    return(
        <>
        {errors.length > 0 && <ErrorAlert errors={errors} />}
        {showModal && <ConfirmModal onCloseHandler={onCloseHandler} setErrorsHandler={setErrorsHandler}/>}
        <div className={styles.header}>
        <div className={
      linksActive 
      ? styles.myLinks_active
      : styles.myLinks_inactive
    }
    >
    <Link to={"/shopping-cart"} className={styles.menu_link}>Shopping Cart<i class="fas fa-shopping-cart"></i></Link>
    <Link to={"/my-profile"} className={styles.menu_link}>My Profile <i className="fas fa-user"></i></Link>
    <NotificationsPopup 
    notifications={notifications} 
    onNotificationHandler={onNotificationHandler} 
    setErrorsHandler={setErrorsHandler}
    userData={authData}
    />
   <MessagesPopup 
   messages={messages} 
   onMessageHandler={onMessageHandler} 
   setErrorsHandler={setErrorsHandler}
   userData = {authData}
   />
  </div>
   {authData &&  <button className={styles.hamburger_icon}  onClick={hamburgActiviyHandler}>
      <i className="fa fa-bars"></i>
    </button>
  }
        <h1>Agro-Tech Market</h1>
        <h3>Excellent solutions for the modern farmer</h3>
      </div>
      <Navbar logoutModalShow={logoutModalShow}/>
      </>
)
}

<i class="fas fa-shopping-cart"></i>