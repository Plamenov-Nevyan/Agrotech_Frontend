import styles from "./userListModal.module.css"

export const UserListModal = ({content, onCloseHandler, likeOrFollow}) => {
    return (
    <>
         <div id="popup1" className={styles.overlay} onClick={() => onCloseHandler()}>
         <div className={styles.popup}>
         <h2>Users who {likeOrFollow} this publication</h2>
         <a className={styles.close} onClick={() => onCloseHandler()}>&times;</a>
         <div className={styles.content}>
            {content}
         </div>
       </div>
       </div>
    </>
    )
}