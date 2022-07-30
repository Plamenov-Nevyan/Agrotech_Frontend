import { useState } from "react";
import styles from "./css/header.module.css"
import { Navbar } from "./Navbar/Navbar";
import { ConfirmModal } from "./ConfirmModal/ConfirmModal";
import { ErrorAlert } from "../Alerts/Error";

export const Header = () => {
  const [linksActive, setActivity] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [logoutError, setLogoutError] = useState([])

  function hamburgActiviyHandler(e){
    e.preventDefault()
    if(linksActive == false){
      setActivity(true)
    }
    else{setActivity(false)}
  } 

  const onCloseHandler = () => setShowModal(false)
  const onLogoutError = (error) => {
    window.scrollTo({top:0,behavior:'smooth'})
    setLogoutError(errors => [...errors, error])
  }

  const logoutModalShow = (e) =>{ 
    e.preventDefault()
    setShowModal(true)
  }

    return(
        <>
        {logoutError.length > 0 && <ErrorAlert errors={logoutError} />}
        {showModal && <ConfirmModal onCloseHandler={onCloseHandler} onLogoutError={onLogoutError}/>}
        <div className={styles.header}>
        <div className={
      linksActive 
      ? styles.myLinks_active
      : styles.myLinks_inactive
    }
    >
    <a href="/my-profile">My Profile <i className="fas fa-user"></i></a>
    <a href="/notifications">Notifications <i className="fas fa-bell"></i><span className={styles.badge}>3</span></a>
    <a href="/messages">Messages <i className="fa-regular fa-message"></i></a>
  </div>
  <a href="javascript:void(0);" className={styles.hamburger_icon} onClick={hamburgActiviyHandler}>
    <i className="fa fa-bars"></i>
  </a>
        <h1>Agro-Tech Market</h1>
        <h3>Excellent solutions for the modern farmer</h3>
      </div>
      <Navbar logoutModalShow={logoutModalShow}/>
      </>
)
}