import styles from "./alerts.module.css"

export const ErrorAlert = ({errors}) => {
    const errorsFiltered = Object.values(errors).filter(errors => errors.length > 0)
    return (
    <div className={styles.alert + " " + styles.error}>
        <input type="checkbox" id="alert1" />
        <label className={styles.close} title="close" htmlFor="alert1">
            <i className="icon-remove" />
        </label>
          {errors.length > 0 &&  errors.map(error => 
           <p className={styles.inner}>
            <strong>Error!</strong> {error}!
           </p>
           )
          }
    </div>
    )
}