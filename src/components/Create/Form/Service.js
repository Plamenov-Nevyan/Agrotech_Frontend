import styles from "../css/form.module.css"

export const Service = () => {
  return (
    <>
     <label for="serviceName" className={styles.label}>Service type:</label>
    <input className={styles.form_field} id="serviceName" type="text" name="serviceName" placeholder="Service type.."/>

    <label for="price" className={styles.label}>Service price:</label>
    <input className={styles.form_field} id="price" type="number" name="price" placeholder = "Service price.."/>


   <label for="description" className={styles.label}>Service description:</label>
    <textarea id="description" name="description" className={styles.description} placeholder="Service description.."></textarea>

    <label for="upload" className={styles.label}>Logo/Machinery image:</label>
    <input type="file" name="upload" id="upload"/>
    
    <button id={styles.submit_btn}>Submit</button>
    </>
  )
}