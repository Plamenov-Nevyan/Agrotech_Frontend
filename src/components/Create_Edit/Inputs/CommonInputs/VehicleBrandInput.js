import styles from "../../css/form.module.css"

export const VehicleBrandInput = ({value, onChangeHandler}) => {
   return (
    <>
    <div className={styles.label_holder}>
        <label htmlFor="brand" className={styles.label}>Brand:</label>
    </div>
   <div className={styles.input_holder}>
    <input 
    className={styles.form_field} 
    id="brand" type="text" 
    name="brand" 
    placeholder="Vehicle brand.."
    value={value}
    onChange={(e) => onChangeHandler(e)}/>
    </div>
    </>
   )
}