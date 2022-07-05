import styles from "./css/login.module.css"
export const H2ForRegister = () => {
    return(
        <>
         <h2 id="sign-in" className={styles.inactive + " " + styles.underlineHover}> Sign In </h2>
           <h2 id="sign-up" className={styles.active}>Sign Up </h2>
        </>
    )
}