import styles from "../../../css/form.module.css"

export const PriceInput = ({value, onChangeHandler}) => {
    return (
        <>
        <div className={styles.label_holder}>
             <label htmlFor="price" className={styles.label}>Price:</label>
        </div>
        <div className={styles.input_holder}>
            <input 
            className={styles.form_field} 
            id="price" type="number"
             name="price" 
             placeholder="Product price.." 
             defaultValue={value}
             onChange={(e) => onChangeHandler(e)}/>
        </div>
        </>
    )
}