import styles from "../../css/form.module.css"

export const NameInput = ({value, onChangeHandler}) => {
   return (
    <>
    <div className={styles.label_holder}>
        <label htmlFor="name" className={styles.label}>Name:</label>
    </div>
   <div className={styles.input_holder}>
    <input 
    className={styles.form_field} 
    id="name" type="text" 
    name="name" 
    placeholder="Product name.."
    value={value}
    onChange={(e) => onChangeHandler(e)}/>
    </div>
    </>
   )
}