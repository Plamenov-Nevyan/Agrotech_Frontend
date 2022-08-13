import styles from "../css/successModal.module.css"

export const SuccessModal = ({onCloseHandler}) => {
  
     return (
     <>
          <div id="popup1" className={styles.overlay} onClick={() => onCloseHandler()}>
          <div className={styles.popup}>
          <h2>Buying Declaration was sent</h2>
          <a className={styles.close} onClick={() => onCloseHandler()}>&times;</a>
          <img className={styles.success_check} src="https://drive.google.com/uc?export=view&id=19ITrNsooSNFOf9IxJ5FPWRSA8H2slquW" />
          <div className={styles.content}>
             <p className={styles.content_p}>
               The sellers were notified that you want to purchase their products, expect to be contacted soon for details !
             </p>
             <div className={styles.link_holder}>
                <button className={styles.ok_btn} onClick={() => onCloseHandler()}>Ok</button>
             </div>
          </div>
        </div>
        </div>
     </>
     )
 }