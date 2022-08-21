import styles from "../../css/login.module.css"

export const PasswordInput = ({value, onChangeHandler, showPassword, onShowOrHidePass}) => {
    return (
        <>
        <div className= {styles.label_holder}>
            <label className= {styles.input_label} htmlFor="password"> Password </label>
            </div>
        <div className={styles.input_holder}>
            <input
                type={showPassword}
                id={styles.password}
                className={styles.fadeIn + " " + styles.third}
                name="password"
                placeholder="Your password.."
                defaultValue={value}
                onChange={(e) => onChangeHandler(e)}
            />
            <span onClick={() => onShowOrHidePass()}>
                { showPassword == 'password'
                ? <i class="fa fa-eye" aria-hidden="true"></i>
                : <i class="fa fa-eye-slash" aria-hidden="true"></i>
                }
            </span>
        </div>
        </>
    )
}