import styles from "../../../css/form.module.css"

export const ServiceTypeSelect = ({value, onChangeHandler}) => {
    return (
        <>
        <div className={styles.label_holder}>
            <label htmlFor="serviceType" className={styles.label}>Service offered</label>
        </div>
        <div className={styles.select_holder}>
                 <select className={styles.select_type} name="serviceType" id="serviceType" defaultValue={value} onChange={(e) => onChangeHandler(e)}>
                  <option value="Field Work">Field work</option>
                  <option value="Storage">Storage</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Transport">Transport</option>
                  <option value="Other">Others</option>      
                </select>   
        </div>
        </>
    )
}