import styles from "../../css/form.module.css"

export const TypeSelect = ({value, onSelectTypeHandler}) => {
    return (
        <>
        <div className={styles.label_holder}>
            <label htmlFor="publicationType" className={styles.label}>What do you want to offer?</label>
        </div>
        <div className={styles.select_holder}>
                 <select className={styles.select_type} name="type" id="type" value={value} onChange={(e) => onSelectTypeHandler(e)}>
                  <option value="product">Crop Treatment Products</option>
                  <option value="vehicle">Agro-Vehicles</option>
                  <option value="inventory">Agro-Inventory</option>
                  <option value="service">Agro-Services</option>
                  <option value="other">Others</option>      
                </select>   
        </div>
        </>
    )
}