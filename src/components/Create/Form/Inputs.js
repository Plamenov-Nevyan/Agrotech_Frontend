import styles from "../css/form.module.css"

export const Inputs = () => { 
  
   return(
    <>
    <label htmlFor="name" className={styles.label}>Name:</label>
    <input className={styles.form_field} id="name" type="text" name="name" placeholder="Product name.."/>
      

    <label htmlFor="price" className={styles.label}>Price:</label>
    <input className={styles.form_field} id="price" type="number" name="price" placeholder = "Product price.."/>

    
    <label htmlFor="quantity" className={styles.label}>Quantity available:</label>
    <input className={styles.form_field} id="quantity" type="number" name="quantity" placeholder = "Product quantity.."/>

   <label htmlFor="description" className={styles.label}>Description:</label>
    <textarea id="description" name="description" className={styles.description} placeholder="Product description.."></textarea>

    <label htmlFor="upload" className={styles.label}>Product image:</label>
    <input type="file" name="upload" id="upload"/>

    <button id={styles.submit_btn}>Submit</button>
    </>
   )
}