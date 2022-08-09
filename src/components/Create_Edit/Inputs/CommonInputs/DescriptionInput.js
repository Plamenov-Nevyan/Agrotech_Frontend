import styles from "../../css/form.module.css"

export const DescriptionInput = ({value, onChangeHandler}) => {
    return (
        <>
        <div className={styles.label_holder}>
            <label htmlFor="description" className={styles.label}>Description:</label>
        </div>
        <div className={styles.input_holder}>
            <textarea 
            id="description"
             name="description" 
             className={styles.description} 
             placeholder="Product description.."
             value={value}
             onChange={(e) => onChangeHandler(e)}
             >
             </textarea>
        </div>
        </>
    )
}