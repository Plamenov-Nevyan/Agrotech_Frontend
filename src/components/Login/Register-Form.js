import styles from  "./css/login.module.css"

export const RegisterForm = (props) => {

   function register(e){
    e.preventDefault()
    let {username,email, password, confirm} = Object.fromEntries(new FormData(e.currentTarget))
   fetch('http://localhost:5000/register', {
     method: 'POST',
     headers: {'Content-Type': 'application/json'},
     body: JSON.stringify({username,email, password, confirm})
   })
   .then((resp) => resp.json())
   .then((userData) => sessionStorage.setItem('userData', JSON.stringify(userData)))
   .catch(err => console.log(err))
   }

    return (<>
    <form onSubmit={register}>
    <input
    type="text"
    id={styles.username}
    className={styles.fadeIn + " " + styles.second}
    name="username"
    placeholder="Your username.."
  />
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
  <input
    type="password"
    id={styles.confirmPass}
    className={styles.fadeIn + " " + styles.fourth}
    name="confirm"
    placeholder="Confirm your password.."
  />
  <input type="submit" id={styles.register_btn} className={styles.fadeIn + " " + styles.fourth} value="Register"/>
</form>
<div id={styles.formFooter}>
  <a className={styles.underlineHover} href="/login" onClick={props.loginRedirect}>
    Already have an account?
  </a>
</div>
</>)
}