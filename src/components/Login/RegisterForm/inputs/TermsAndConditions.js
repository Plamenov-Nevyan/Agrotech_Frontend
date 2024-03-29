import styles from "../../css/login.module.css"

export const TermsAndConditions = ({value, onChangeHandler, tacModalToggle}) => {
    return(<div className={styles.input_holder}>
        <input type="checkbox" name="tac" id="tac" checked={value}  onChange={(e) => onChangeHandler(e)}/>
        <span className={styles.tac_span}>
            I agree with the <span className={styles.tac_show_span} onClick={() => tacModalToggle()}>Terms and Conditions</span>
            </span>
    </div>)
}