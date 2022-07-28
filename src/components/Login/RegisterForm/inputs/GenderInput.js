import styles from "../../css/login.module.css"

export const GenderInput = ({value, onChangeHandler}) => {
    return(
        <>
        <div className={styles.label_holder} id={styles.checkbox_lb_holder}>
           <label htmlFor="userType">Your gender ?</label>
        </div>
        <div className={styles.individual_check}>
            <input type="radio" name="gender" id="gender" value="Male" checked={value === 'Male'}  onChange={(e) => onChangeHandler(e)}/>
            <span>Male</span>
        </div>
        <div className={styles.company_check}>
            <input type="radio" name="gender" id="gender" value="Female" checked={value === 'Female'}  onChange={(e) => onChangeHandler(e)}/>
            <span>Female</span>
        </div>
        </>
    )
}