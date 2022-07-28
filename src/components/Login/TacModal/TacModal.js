import styles from "../css/tacModal.module.css"
import { TermsAndConditions } from "../../../config/TermsAndConditions"

export const TacModal = ({onCloseHandler}) => {
     return (
     <>
          <div id="popup1" className={styles.overlay} onClick={() => onCloseHandler()}>
          <div className={styles.popup}>
          <h2>Terms and Conditions</h2>
          <a className={styles.close} onClick={() => onCloseHandler()}>&times;</a>
          <div className={styles.content}>
              {Object.values(TermsAndConditions).map(paragraph => <p className={styles.tac_p}>{paragraph}</p>)}
          </div>
        </div>
        </div>
     </>
     )
 }