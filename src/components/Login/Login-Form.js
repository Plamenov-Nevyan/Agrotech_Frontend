import styles from "./css/login.module.css"
export const LoginForm = () => {
  function login(e){
    e.preventDefault()
    let {email, password} = Object.fromEntries(new FormData(e.currentTarget))
   fetch('http://localhost:5000/login', {
     method: 'POST',
     headers: {'Content-Type': 'application/json'},
     body: JSON.stringify({email, password})
   })
   .then((resp) => resp.json())
   .then((userData) => sessionStorage.setItem('userData', JSON.stringify(userData)))
   .catch(err => console.log(err))
   }

    return (
        <>
        <form onSubmit={login}>
      <input
        type="text"
        id={styles.email}
        className={styles.fadeIn + " " + styles.second}
        name="email"
        placeholder="Your email.."
      />
      <input
        type="password"
        id={styles.password}
        className={styles.fadeIn + " " + styles.third}
        name="password"
        placeholder="Your password.."
      />
      <input type="submit" id={styles.login_btn} className={styles.fadeIn + " " + styles.fourth} value= "Login" />
    </form>
    <div id={styles.formFooter}>
      <a className={styles.underlineHover} href="#">
        Forgot Password?
      </a>
    </div>
    </>
    )
}