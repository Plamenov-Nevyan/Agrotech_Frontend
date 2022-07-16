import styles from "../../../css/form.module.css"

export const VehicleKilometers = ({value, onChangeHandler}) => {
   return (
    <>
    <div className={styles.label_holder}>
        <label htmlFor="kilometers" className={styles.label}>Kilometers driven:</label>
    </div>
   <div className={styles.input_holder}>
    <input 
    className={styles.form_field} 
    id="kilometers" type="number" 
    name="kilometers" 
    placeholder="Vehicle kilometers.."
    defaultValue={value}
    onChange={(e) => onChangeHandler(e)}/>
    </div>
    </>
   )
}