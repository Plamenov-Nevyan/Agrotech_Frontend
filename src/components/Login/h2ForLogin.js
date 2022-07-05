import styles from "./css/login.module.css"
export const H2ForLogin = () => {
    return(
        <>
        <h2 id="sign-in" className={styles.active}> Sign In </h2>
        <h2 id="sign-up" className={styles.inactive + " " + styles.underlineHover}>Sign Up </h2>
        </>
    )
}