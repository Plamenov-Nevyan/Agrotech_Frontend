import { useState } from "react"
import { ConfirmInput } from "./ConfirmInput"
import styles from  "../css/login.module.css"
import { EmailInput } from "./EmailInput"
import { FileInput } from "./FileInput"
import { PasswordInput } from "./PasswordInput"
import { UsernameInput } from "./UsernameInput"
import { UserTypeInput } from "./UserTypeInput"
import { TermsAndConditions } from "./TermsAndConditions"
import { PhoneNumberInput } from "./PhoneNumberInput"
import { UicInput } from "./UicInput"

export const RegisterForm = ({onSubmitHandler}) => {
  const [inputValues, setInputValues] = useState({
    username : '',
    email : '',
    password : '',
    confirm: '',
    phoneNumber : '',
    uic: '',
    userType: 'individual',
    tac: false
})
const onChangeHandler = (e) => {
 setInputValues(oldValues => {
 return {...oldValues,
         [e.target.name] : e.target.type === 'checkbox'? e.target.checked : e.target.value
  }
 })
}
return (<>
    <form className={styles.registerForm} onSubmit={(e) => onSubmitHandler(e, inputValues)}>
     <UsernameInput value={inputValues.username} onChangeHandler={onChangeHandler}/>
     <EmailInput value={inputValues.email} onChangeHandler={onChangeHandler}/>
     <PasswordInput value={inputValues.password} onChangeHandler={onChangeHandler}/>
     <ConfirmInput value={inputValues.confirm} onChangeHandler={onChangeHandler}/>
     <UserTypeInput value={inputValues.userType} onChangeHandler={onChangeHandler}/>
     {inputValues.userType === 'individual'
      ? <PhoneNumberInput value={inputValues.phoneNumber} onChangeHandler={onChangeHandler}/>
      : <UicInput value={inputValues.uic} onChangeHandler={onChangeHandler} />
     }
     {/* <FileInput /> */}
  <input type="submit" id={styles.register_btn} className={styles.fadeIn + " " + styles.fourth} value="Register" disabled={!inputValues.tac}/>
   <TermsAndConditions value={inputValues.tac} onChangeHandler={onChangeHandler}/>
</form>
</>
)
}