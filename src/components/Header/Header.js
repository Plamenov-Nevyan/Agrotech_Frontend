import styles from "./css/header.module.css"
import { Navbar } from "./Navbar/Navbar";
import { useState } from "react";

export const Header = (props) => {
  const [linksActive, setActivity] = useState(false)

  function hamburgActiviyHandler(e){
    e.preventDefault()
    if(linksActive == false){
      setActivity(true)
    }
    else{setActivity(false)}
  } 

    return(
        <>
        <div className={styles.header}>
        <div className={
      linksActive 
      ? styles.myLinks_inactive
      : styles.myLinks_active
    }
    >
    <a href="/my-profile">My Profile <i className="fas fa-user"></i></a>
    <a href="/notifications">Notifications <i className="fas fa-bell"></i><span className={styles.badge}>3</span></a>
    <a href="/messages">Messages <i className="fa-regular fa-message"></i></a>
  </div>
  <a href="javascript:void(0);" className={styles.hamburger_icon} onClick={hamburgActiviyHandler}>
    <i className="fa fa-bars"></i>
  </a>
        <h1>My Website</h1>
        <p>Resize the browser window to see the effect.</p>
      </div>
      <Navbar />
      </>
)
}