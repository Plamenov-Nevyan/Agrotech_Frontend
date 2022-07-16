import styles from "../../../css/form.module.css"

export const InventoryTypeSelect = ({value, onChangeHandler}) => {
    return (
        <>
        <div className={styles.label_holder}>
            <label htmlFor="inventoryType" className={styles.label}>Inventory type:</label>
        </div>
        <div className={styles.select_holder}>
                 <select className={styles.select_type} name="serviceType" id="serviceType" defaultValue={value} onChange={(e) => onChangeHandler(e)}>
                  <option value="plough">Plough</option>
                  <option value="harrow">Harrow</option>
                  <option value="sprinkler">Sprinkler</option>
                  <option value="cultivator">Cultivator</option>
                  <option value="sower">Sower</option>      
                  <option value="other">Others</option>   
                </select>   
        </div>
        </>
    )
}