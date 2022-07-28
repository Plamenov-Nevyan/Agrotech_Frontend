import styles from "./alerts.module.css"

export const WarningAlert = () => {
    return (
        <div className={styles.alert + ' ' + styles.warning}>
            <input type="checkbox" id="alert4" />
            <label className={styles.close} title="close" htmlFor="alert4">
                <i className="icon-remove" />
            </label>
            <p className={styles.inner}>Warnings should be orange correct?</p>
        </div>
    )
}