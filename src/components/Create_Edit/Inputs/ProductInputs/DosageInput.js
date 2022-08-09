import styles from "../../css/form.module.css"

export const DosageInput = ({value, onChangeHandler}) => {
   return (
    <>
    <div className={styles.label_holder}>
        <label htmlFor="dosage" className={styles.label}>Recommended dosage:</label>
    </div>
   <div className={styles.input_holder}>
    <input 
    className={styles.form_field} 
    id="dosage" type="text" 
    name="dosage" 
    placeholder="Product recommended dosage in milliliters.."
    value={value}
    onChange={(e) => onChangeHandler(e)}/>
    </div>
    </>
   )
}