import styles from "../css/login.module.css"

export const PasswordInput = ({value, onChangeHandler}) => {
    return (
        <>
        <div className= {styles.label_holder}>
            <label className= {styles.input_label} htmlFor="password"> Password </label>
            </div>
        <div className={styles.input_holder}>
            <input
                type="password"
                id={styles.password}
                className={styles.fadeIn + " " + styles.third}
                name="password"
                placeholder="Your password.."
                defaultValue={value}
                onChange={(e) => onChangeHandler(e)}
            />
        </div>
        </>
    )
}