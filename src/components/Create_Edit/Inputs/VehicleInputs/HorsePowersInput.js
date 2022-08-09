import styles from "../../css/form.module.css"

export const VehicleHorsePowers = ({value, onChangeHandler}) => {
   return (
    <>
    <div className={styles.label_holder}>
        <label htmlFor="horsePowers" className={styles.label}>Horse Powers:</label>
    </div>
   <div className={styles.input_holder}>
    <input 
    className={styles.form_field} 
    id="horsePowers" type="number" 
    name="horsePowers" 
    placeholder="Vehicle horse powers.."
    value={value}
    onChange={(e) => onChangeHandler(e)}/>
    </div>
    </>
   )
}