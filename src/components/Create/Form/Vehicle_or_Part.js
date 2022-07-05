import styles from "../css/form.module.css"

export const Vehicle_or_Part = () => {
    return(
        <>
        <label for="brand" className={styles.label}>Vehicle/Part brand:</label>
        <input className={styles.form_field} id="brand" type="text" name="brand" placeholder="Brand.."/>

        <label for="model_or_name" className={styles.label}>Vehicle model/Part name:</label>
        <input className={styles.form_field} id="model_or_name" type="text" name="model_or_name" placeholder="Model or part name.."/>
    
        <label for="price" className={styles.label}>Price:</label>
        <input className={styles.form_field} id="price" type="number" name="price" placeholder = "Price.."/>
    
        
        <label for="quantity" className={styles.label}>Quantity available:</label>
        <input className={styles.form_field} id="quantity" type="number" name="quantity" placeholder = "Quantity.."/>
    
       <label for="description" className={styles.label}>Description:</label>
        <textarea id="description" name="description" className={styles.description} placeholder="Description.."></textarea>
    
        <label for="upload" className={styles.label}>Image:</label>
        <input type="file" name="upload" id="upload"/>
    
        <button id={styles.submit_btn}>Submit</button>
        </>
       )
}