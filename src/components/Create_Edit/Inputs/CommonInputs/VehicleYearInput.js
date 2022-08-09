import styles from "../../css/form.module.css"

export const VehicleDateInput = ({value, onChangeHandler}) => {
   return (
    <>
    <div className={styles.label_holder}>
        <label htmlFor="date" className={styles.label}>Date of production:</label>
    </div>
   <div className={styles.input_holder}>
    <input 
    className={styles.form_field} 
    id="date" type="date" 
    name="date" 
    placeholder="Vehicle date of production.."
    value={value}
    onChange={(e) => onChangeHandler(e)}/>
    </div>
    </>
   )
}