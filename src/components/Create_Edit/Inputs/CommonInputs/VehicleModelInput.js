import styles from "../../css/form.module.css"

export const VehicleModelInput = ({value, onChangeHandler}) => {
   return (
    <>
    <div className={styles.label_holder}>
        <label htmlFor="model" className={styles.label}>Model:</label>
    </div>
   <div className={styles.input_holder}>
    <input 
    className={styles.form_field} 
    id="model" type="text" 
    name="model" 
    placeholder="Vehicle model.."
    value={value}
    onChange={(e) => onChangeHandler(e)}/>
    </div>
    </>
   )
}