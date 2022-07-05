import styles from "../css/form.module.css"

export const Product = () => { 
  
   return(
    <>
    <label for="name" className={styles.label}>Name:</label>
    <input className={styles.form_field} id="name" type="text" name="name" placeholder="Product name.."/>

    <label for="price" className={styles.label}>Price:</label>
    <input className={styles.form_field} id="price" type="number" name="price" placeholder = "Product price.."/>

    
    <label for="quantity" className={styles.label}>Quantity available:</label>
    <input className={styles.form_field} id="quantity" type="number" name="quantity" placeholder = "Product quantity.."/>

   <label for="description" className={styles.label}>Description:</label>
    <textarea id="description" name="description" className={styles.description} placeholder="Product description.."></textarea>

    <label for="upload" className={styles.label}>Product image:</label>
    <input type="file" name="upload" id="upload"/>

    <label for="type" className={styles.label}>What do you offer?</label>
    <select id={styles.select_type} name="type">
                    <option value="products">Crop treatment product</option>
                    <option value="others">Other</option>
    </select>
    <button id={styles.submit_btn}>Submit</button>
    </>
   )
}