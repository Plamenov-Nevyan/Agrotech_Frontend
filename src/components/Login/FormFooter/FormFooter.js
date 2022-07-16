import styles from "../css/login.module.css"

export const FormFooter = ({action, setAction}) => {
    return (
        <div id={styles.formFooter}>
            {action == 'Register'
             ? (
                <a className={styles.underlineHover} onClick={(e) => setAction('Login')}>
                Already have an account?
            </a>
             )
             : (
                <a className={styles.underlineHover} onClick={(e) => setAction('Register')}>
                Sign up here!
            </a>
             )
            }
        </div>
    )
}