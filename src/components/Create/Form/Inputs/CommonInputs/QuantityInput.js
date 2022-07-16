import styles from "../../../css/form.module.css"

export const QuantityInput = ({value, onChangeHandler}) => {
    return(
        <>
        <div className={styles.label_holder}>
            <label htmlFor="quantity" className={styles.label}>Quantity available:</label>
        </div>
        <div className={styles.input_holder}>
    <input 
    className={styles.form_field} 
    id="quantity" 
    type="number" 
    name="quantity" 
    placeholder = "Product quantity.."
    defaultValue={value}
    onChange={(e) => onChangeHandler(e)}/>
        </div>
        </>
    )
}