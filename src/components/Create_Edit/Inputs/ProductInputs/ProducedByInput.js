import styles from "../../css/form.module.css"

export const ProducedByInput = ({value, onChangeHandler}) => {
   return (
    <>
    <div className={styles.label_holder}>
        <label htmlFor="producedBy" className={styles.label}>Which company made this product:</label>
    </div>
   <div className={styles.input_holder}>
    <input 
    className={styles.form_field} 
    id="producedBy" type="text" 
    name="producedBy" 
    placeholder="Produced by..."
    value={value}
    onChange={(e) => onChangeHandler(e)}/>
    </div>
    </>
   )
}