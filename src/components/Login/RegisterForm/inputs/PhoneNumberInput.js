import styles from "../../css/login.module.css"

export const PhoneNumberInput = ({countryValue, value, onChangeHandler, onCountryPhoneChange}) => {
 
    return(
    <>
    <div className= {styles.label_holder}>
            <label className= {styles.input_label} htmlFor="phoneNumber"> Phone number </label>
    </div>
      <div className={styles.input_holder}>
        <select name="countrySelect" defaultValue={countryValue} onChange={(e) => onCountryPhoneChange(e)}>
          <option value="+1 ">🇺🇸</option>
          <option value="+380 ">🇺🇦</option>
          <option value="+359 ">🇧🇬</option>
          <option value="+41 ">🇨🇭</option>
          <option value="+48 ">🇸🇪</option>
          <option value="+44 ">🇬🇧</option>
          <option value="+7 ">🇷🇺</option>
          <option value="+351 ">🇵🇹</option>
          <option value="+49 ">🇩🇪</option>
          <option value="+33 ">🇫🇷</option>
        </select>
        <input
        type="text"
        id={styles.phoneNumber}
        className={styles.fadeIn + " " + styles.third}
        name="phoneNumber"
        placeholder="Your phone number for contacts.."
        value={value}
        onChange={(e) => onChangeHandler(e)}
      />
      </div>
    </>
    )
}