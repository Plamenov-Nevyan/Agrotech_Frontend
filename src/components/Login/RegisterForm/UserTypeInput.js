import styles from "../css/login.module.css"

export const UserTypeInput = ({value, onChangeHandler}) => {
    return(
        <>
        <div className={styles.label_holder} id={styles.checkbox_lb_holder}>
           <label htmlFor="userType">You are ?</label>
        </div>
        <div className={styles.individual_check}>
            <input type="radio" name="userType" id="userType" value="individual" checked={value === 'individual'}  onChange={(e) => onChangeHandler(e)}/>
            <span>Individual user</span>
        </div>
        <div className={styles.company_check}>
            <input type="radio" name="userType" id="userType" value="organization" checked={value === 'organization'}  onChange={(e) => onChangeHandler(e)}/>
            <span>Organization(Company or Firm)</span>
            </div>
        </>
    )
}