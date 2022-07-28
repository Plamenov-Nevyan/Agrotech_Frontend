import styles from "../css/category.module.css"

export const CategorySelect = ({categoryToShow}) => {
    return(
        <div className={styles.category_container}>
            <label htmlFor="catgory">Category</label>
            <select id="category" name="category" onChange={(e) => categoryToShow(e.target.value)}>
                <option value="all">All</option>
                 <option value="product">Crop Treatment Products</option> 
                 <option value="vehicle">Agro Vehicles</option>
                 <option value="inventory">Inventory</option>
                 <option value="service">Agro Services</option>
                 <option value="other">Others</option>
            </select>
        </div>
    )
} 