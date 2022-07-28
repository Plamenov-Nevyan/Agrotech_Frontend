import styles from "../../css/login.module.css"

export const ConfirmInput = ({value, onChangeHandler}) => {

    return (
        <>
        <div className= {styles.label_holder}>
            <label className= {styles.input_label} htmlFor="confirm"> Confirm Password</label>
            </div>
        <div className={styles.input_holder}>
            <input
                type="password"
                id={styles.confirmPass}
                className={styles.fadeIn + " " + styles.fourth}
                name="confirm"
                placeholder="Confirm your password.."
                defaultValue={value}
                onChange={(e) => onChangeHandler(e)}
            />
        </div>
    </>
    )
}