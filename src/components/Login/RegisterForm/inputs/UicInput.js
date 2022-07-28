import styles from "../../css/login.module.css"

export const UicInput = ({value, onChangeHandler}) => {
    return(
    <>
    <div className= {styles.label_holder}>
            <label className= {styles.input_label} htmlFor="password"> Unified Identification Code </label>
    </div>
      <div className={styles.input_holder}>
        <input
        type="number"
        id={styles.password}
        className={styles.fadeIn + " " + styles.third}
        name="phoneNumber"
        placeholder="Your company's UIC (Unified Identification Code).."
        defaultValue={value}
        onChange={(e) => onChangeHandler(e)}
      />
      </div>
    </>
    )
}