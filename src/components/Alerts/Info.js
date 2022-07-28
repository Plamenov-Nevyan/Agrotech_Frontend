import styles from "./alerts.module.css"

export const InfoAlert = () => {
    return (
        <div className={styles.alert + styles.info}>
            <input type="checkbox" id="alert3" />
            <label className={styles.close} title="close" htmlFor="alert3">
                <i className="icon-remove" />
            </label>
            <p className={styles.inner}>
                Here is an info block. Just playing with colours. also lets make this one
                have lots and lots of text to show off what line wrapping looks like.
            </p>
        </div>
    )
}