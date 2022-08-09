import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { useShoppingCart } from "../../../hooks/useShoppingCart"
import { authContext } from "../../../contexts/authContext"
import { logoutUser } from "../../../services/userServices"
import styles from "../css/confirmModal.module.css"

export const ConfirmModal = ({onCloseHandler, setErrorsHandler}) => {
const navigate = useNavigate()
const {_, authData, onUserLogout} = useContext(authContext)
const [__, ___, ____, _____, deleteCart] = useShoppingCart()
const onLogout = () => {
   logoutUser(authData.accessToken)
   .then(message => {
    onCloseHandler()
    onUserLogout()
    deleteCart()
    navigate('/', {state:{showSuccessAlert:true, username: authData.username}})
})
   .catch(err => {
      onCloseHandler()
      setErrorsHandler(err.message)
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