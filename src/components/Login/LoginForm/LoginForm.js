import { useState } from "react"
import styles from "../css/login.module.css"
import { EmailInput } from "./EmailInput"
import { PasswordInput } from "./PasswordInput"
export const LoginForm = ({onSubmitHandler}) => {
  const [inputValues, setInputValues] = useState({
    email : '',
    password : '',
  }
  )
  const onChangeHandler = (e) => {
    setInputValues(oldValues => {
    return {...oldValues,
            [e.target.name] : e.target.value
     }
    })
   }
    return (
        <>
        <form className={styles.loginForm} onSubmit={(e) => onSubmitHandler(e, inputValues)}>
        <EmailInput value={inputValues.email} onChangeHandler={onChangeHandler}/>
        <PasswordInput value={inputValues.password} onChangeHandler={onChangeHandler}/>
      <input type="submit" id={styles.login_btn} className={styles.fadeIn + " " + styles.fourth} value= "Login" />
    </form>
    </>
    )
}