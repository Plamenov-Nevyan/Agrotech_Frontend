import { useState, useEffect } from "react"
import styles from  "../css/login.module.css"
import { ConfirmInput } from "./inputs/ConfirmInput"
import { EmailInput } from "./inputs/EmailInput"
import { FileInput } from "./inputs/FileInput"
import { PasswordInput } from "./inputs/PasswordInput"
import { UsernameInput } from "./inputs/UsernameInput"
import { UserTypeInput } from "./inputs/UserTypeInput"
import { TermsAndConditions } from "./inputs/TermsAndConditions"
import { PhoneNumberInput } from "./inputs/PhoneNumberInput"
import { UicInput } from "./inputs/UicInput"
import { LocationInput } from "./inputs/LocationInput"
import { GenderInput } from "./inputs/GenderInput"
import { TacModal } from "../TacModal/TacModal"

export const RegisterForm = ({onSubmitHandler}) => {
  const [countryPhoneNum, setCountryPhoneNum] = useState('+359')
  const [showTacModal, setShowTacModal] = useState(false)
  const [inputValues, setInputValues] = useState(
{ 
    username : '',
    email : '',
    countrySelect: '+359',
    password : '',
    confirm: '',
    phoneNumber : countryPhoneNum,
    uic: '',
    location: '',
    userType: 'individual',
    gender: 'Male',
    tac: false,
}
)

const onChangeHandler = (e) => setInputValues(oldValues => {
         return {
            ...oldValues,
            [e.target.name] : e.target.type === 'checkbox'? e.target.checked : e.target.value,
      }
  })

const onCountryPhoneChange = (e) => setCountryPhoneNum(e.target.value)

useEffect(() => {
  setInputValues(oldValues => {return{...oldValues, phoneNumber:countryPhoneNum}})
}, [countryPhoneNum])

const tacModalToggle = () => showTacModal ? setShowTacModal(false) : setShowTacModal(true)
const onCloseHandler = () => setShowTacModal(false)

return (<>
     {showTacModal && <TacModal onCloseHandler={onCloseHandler}/>}
    <form className={styles.registerForm} onSubmit={(e) => onSubmitHandler(e, inputValues, 'Register')}>
     <UsernameInput value={inputValues.username} onChangeHandler={onChangeHandler} />
     <EmailInput value={inputValues.email} onChangeHandler={onChangeHandler} />
     <PasswordInput value={inputValues.password} onChangeHandler={onChangeHandler} />
     <ConfirmInput value={inputValues.confirm} onChangeHandler={onChangeHandler} />
     <UserTypeInput value={inputValues.userType} onChangeHandler={onChangeHandler}/>
     {inputValues.userType === 'individual'
      ?<> 
      <PhoneNumberInput countryValue={countryPhoneNum} value={inputValues.phoneNumber} onChangeHandler={onChangeHandler} onCountryPhoneChange={onCountryPhoneChange}/>
      <GenderInput value={inputValues.gender} onChangeHandler={onChangeHandler}/>
      </>
      :<> 
      <UicInput value={inputValues.uic} onChangeHandler={onChangeHandler} />
      <LocationInput value={inputValues.location} onChangeHandler={onChangeHandler}/>
      </>
     }
     {/* <FileInput /> */}
  <input type="submit" id={styles.register_btn} className={styles.fadeIn + " " + styles.fourth} value="Register" disabled={!inputValues.tac}/>
   <TermsAndConditions value={inputValues.tac} onChangeHandler={onChangeHandler} tacModalToggle={tacModalToggle}/>
</form>
</>
)
}