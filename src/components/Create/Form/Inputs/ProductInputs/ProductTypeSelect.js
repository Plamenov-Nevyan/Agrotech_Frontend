import styles from "../../../css/form.module.css"

export const ProductTypeSelect = ({value, onChangeHandler}) => {
    return (
        <>
        <div className={styles.label_holder}>
            <label htmlFor="productType" className={styles.label}>Product Type</label>
        </div>
        <div className={styles.select_holder}>
                 <select className={styles.select_type} name="productType" id="productType" defaultValue={value} onChange={(e) => onChangeHandler(e)}>
                  <option value="Insecticide">Insecticide</option>
                  <option value="Fungicide">Fungicide</option>
                  <option value="Herbicide">Herbicide</option>
                  <option value="Seed Treament">Seed Treatment</option>
                  <option value="Fertilizer">Fertilizer</option>
                  <option value="Other">Others</option>      
                </select>   
        </div>
        </>
    )
}