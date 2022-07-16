import styles from "../../../css/form.module.css"

export const AvailableInput = ({value, onChangeHandler}) => {
   return (
    <>
    <div className={styles.label_holder}>
        <label htmlFor="availableUntil" className={styles.label}>This service is available until:</label>
    </div>
   <div className={styles.input_holder}>
    <input 
    className={styles.form_field} 
    id="availableUntil" type="date" 
    name="availableUntil" 
    placeholder="Service is available until.."
    defaultValue={value}
    onChange={(e) => onChangeHandler(e)}/>
    </div>
    </>
   )
}