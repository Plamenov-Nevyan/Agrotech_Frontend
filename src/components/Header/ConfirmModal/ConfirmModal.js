import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { authContext } from "../../../contexts/authContext"
import { logoutUser } from "../../../services/userServices"
import styles from "../css/confirmModal.module.css"

export const ConfirmModal = ({onCloseHandler, onLogoutError}) => {
const navigate = useNavigate()
const {_, authData, onUserLogout} = useContext(authContext)
const onLogout = () => {
   logoutUser(authData.accessToken)
   .then(message => {
    onCloseHandler()
    onUserLogout()
    navigate('/', {state:{showSuccessAlert:true, username: authData.username}})
})
   .catch(err => {
      onCloseHandler()
      onLogoutError(err.message)
   })
}

     return (
     <>
          <div id="popup1" className={styles.overlay}>
          <div className={styles.popup}>
          <h2>Confirm Logout</h2>
          <a className={styles.close} onClick={() => onCloseHandler()}>&times;</a>
          <div className={styles.content}>
             <p className={styles.content_p}>Are you sure you want to exit your profile ?</p>
             <div className={styles.link_holder}>
                <button onClick={onLogout}>Yes</button>
                <button onClick={() => onCloseHandler()}>Cancel</button>
             </div>
          </div>
        </div>
        </div>
     </>
     )
 }