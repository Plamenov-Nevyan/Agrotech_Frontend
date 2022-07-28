import { useState } from "react"
import styles from "../css/login.module.css"
import { EmailInput } from "./inputs/EmailInput"
import { PasswordInput } from "./inputs/PasswordInput"
import { ErrorAlert } from "../../Alerts/Error"

export const LoginForm = ({onSubmitHandler}) => {
  const [inputValues, setInputValues] = useState({
    email : '',
    password : '',
  })
  const [errors, setErrors] = useState({
    email:'',
    password:'',
  })

  const onErrorPopup = (input, errors) => setErrors(state => {
    return {
      ...state,
      [input] : errors
   }
  })
   

  const onChangeHandler = (e) => {
    setInputValues(oldValues => {
    return {...oldValues,
            [e.target.name] : e.target.value
     }
    })
   }

    return (
        <>
        <form className={styles.loginForm} onSubmit={(e) => onSubmitHandler(e, inputValues, 'Login')}>
        <EmailInput value={inputValues.email} onChangeHandler={onChangeHandler} onErrorPopup={onErrorPopup}/>
        <PasswordInput value={inputValues.password} onChangeHandler={onChangeHandler} onErrorPopup={onErrorPopup}/>
      <input type="submit" id={styles.login_btn} className={styles.fadeIn + " " + styles.fourth} value= "Login" />
    </form>
    </>
    )
}