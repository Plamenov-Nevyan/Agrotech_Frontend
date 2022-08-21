import styles from "./alerts.module.css"

// Receive errors passed by other components and inform the user
export const ErrorAlert = ({errors}) => {

    return (
    <div className={styles.alert + " " + styles.error}>
        <input type="checkbox" id="alert1" />
        <label className={styles.close} title="close" htmlFor="alert1">
            <i className="icon-remove" />
        </label>
         { 
         errors.map(error => 
         <p className={styles.inner}>
            <strong>Error!</strong> {error}!
         </p>
           )
          }
    </div>
    )
}