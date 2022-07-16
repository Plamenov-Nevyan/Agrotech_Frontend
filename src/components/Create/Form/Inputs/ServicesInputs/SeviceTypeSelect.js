import styles from "../../../css/form.module.css"

export const ServiceTypeSelect = ({value, onChangeHandler}) => {
    return (
        <>
        <div className={styles.label_holder}>
            <label htmlFor="serviceType" className={styles.label}>Service offered</label>
        </div>
        <div className={styles.select_holder}>
                 <select className={styles.select_type} name="serviceType" id="serviceType" defaultValue={value} onChange={(e) => onChangeHandler(e)}>
                  <option value="fieldWork">Field work</option>
                  <option value="storage">Storage</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="transport">Transport</option>
                  <option value="other">Others</option>      
                </select>   
        </div>
        </>
    )
}