import styles from "./alerts.module.css"

export const SuccessAlert = ({message}) => {
    return (
        <div className={styles.alert + ' ' + styles.success}>
            <input type="checkbox" id="alert2" />
            <label className={styles.close} title="close" htmlFor="alert2">
                <i className="icon-remove" />
            </label>
            <p className={styles.inner}>{message}</p>
        </div>
    )
}