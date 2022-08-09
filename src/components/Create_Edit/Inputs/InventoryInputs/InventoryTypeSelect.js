import styles from "../../css/form.module.css"

export const InventoryTypeSelect = ({value, onChangeHandler}) => {
    return (
        <>
        <div className={styles.label_holder}>
            <label htmlFor="inventoryType" className={styles.label}>Inventory type:</label>
        </div>
        <div className={styles.select_holder}>
                 <select className={styles.select_type} name="inventoryType" id="inventoryType" value={value} onChange={(e) => onChangeHandler(e)}>
                  <option value="Plough">Plough</option>
                  <option value="Harrow">Harrow</option>
                  <option value="Sprinkler">Sprinkler</option>
                  <option value="Cultivator">Cultivator</option>
                  <option value="Seeder">Sower</option>      
                  <option value="Other">Others</option>   
                </select>   
        </div>
        </>
    )
}