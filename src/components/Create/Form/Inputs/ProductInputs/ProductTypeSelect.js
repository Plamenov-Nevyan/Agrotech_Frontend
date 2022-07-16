import styles from "../../../css/form.module.css"

export const ProductTypeSelect = ({value, onChangeHandler}) => {
    return (
        <>
        <div className={styles.label_holder}>
            <label htmlFor="productType" className={styles.label}>Product Type</label>
        </div>
        <div className={styles.select_holder}>
                 <select className={styles.select_type} name="productType" id="productType" defaultValue={value} onChange={(e) => onChangeHandler(e)}>
                  <option value="insecticide">Insecticide</option>
                  <option value="fungicide">Fungicide</option>
                  <option value="herebicide">Herbicide</option>
                  <option value="seedTreament">Seed Treatment</option>
                  <option value="other">Others</option>      
                </select>   
        </div>
        </>
    )
}