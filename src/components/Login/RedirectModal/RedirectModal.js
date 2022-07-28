import {Link} from "react-router-dom"
import styles from "../css/redirectModal.module.css"

export const RedirectModal = ({
   content, 
   onCloseHandler, 
   linkA, 
   linkB, 
   loginOrRegister, 
   successOrUnsuccessfull
}) => {
    return (
    <>
         <div id="popup1" className={styles.overlay}>
         <div className={styles.popup}>
         <h2>{loginOrRegister} was {successOrUnsuccessfull}</h2>
         {/* <a className={styles.close} onClick={() => onCloseHandler()}>&times;</a> */}
         <div className={styles.content}>
            <p className={styles.content_p}>{content}</p>
            <div className={styles.link_holder}>
                <Link to={linkA.href}>{linkA.name}</Link>
                {linkB && <Link to={linkB.href}>{linkB.name}</Link>}
            </div>
         </div>
       </div>
       </div>
    </>
    )
}