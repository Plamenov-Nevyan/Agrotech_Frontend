import styles from "../../css/showDeletedModal.module.css"

export const ShowDeletedModal = ({onCloseHandler, publication, sender}) => {

     return (
     <>
          <div id="popup1" className={styles.overlay} onClick={() => onCloseHandler()}>
          <div className={styles.popup}>
          <h2>Publication Deleted</h2>
          <a className={styles.close} onClick={() => onCloseHandler()}>&times;</a>
          <div className={styles.content}>
             <p className={styles.content_p}>
                {sender.username} has deleted his/her publication about`
               <span>
                  {
                  publication.name 
                  ? publication.name
                  : publication.model 
                      ? publication.model
                      : publication.serviceType
               }
               </span>
               <p>
                  You are not following it anymore.
               </p>
             </p>
             <div className={styles.link_holder}>
                <button onClick={() => onCloseHandler()}>Ok</button>
             </div>
          </div>
        </div>
        </div>
     </>
     )
 }