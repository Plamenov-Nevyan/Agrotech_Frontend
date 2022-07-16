import styles from "../css/login.module.css"

export const PhoneNumberInput = ({value, onChangeHandler}) => {
    return(
    <>
    <div className= {styles.label_holder}>
            <label className= {styles.input_label} htmlFor="password"> Phone number </label>
    </div>
      <div className={styles.input_holder}>
        <input
        type="number"
        id={styles.password}
        className={styles.fadeIn + " " + styles.third}
        name="phoneNumber"
        placeholder="Your phone number for contacts.."
        defaultValue={value}
        onChange={(e) => onChangeHandler(e)}
      />
      </div>
    </>
    )
}