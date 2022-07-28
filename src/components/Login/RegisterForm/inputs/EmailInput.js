import styles from "../../css/login.module.css"

export const EmailInput = ({value, onChangeHandler}) => {
   
    return (
        <>
            <div className={styles.label_holder}>
                <label className={styles.input_label} htmlFor="email"> Email </label>
            </div>
            <div className={styles.input_holder}>
                <input
                    type="text"
                    id={styles.email}
                    className={styles.fadeIn + " " + styles.second}
                    name="email"
                    placeholder="Your email.."
                    defaultValue={value}
                    onChange={(e) => onChangeHandler(e)}
                />
            </div>
        </>
    )
}