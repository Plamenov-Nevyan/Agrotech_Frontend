import styles from "./subheader.module.css"

export const SubHeader = () => {
    return(
        <div className={styles['hero-image']}>
        <div className={styles['hero-text']}>
          <h1>Welcome to our marketplace, review the latest and most popular offers for the modern agriculture</h1>
          <p></p>
          <ul>
              <li>
                <label for="sort-by"> Sort by:</label>
                <select name="sort-by" id="sort-by">
                    <option value="ascending">Most popular</option>
                    <option value="descending">Least popular</option>
                    <option value="expensive">Most expensive</option>
                    <option value="cheapest">Most cheapest</option>
                </select>
            </li>
            <li>
                <label for="type"> Type:</label>
                <select name="sort-by" id="sort-by">
                    <option value="all">All</option>
                    <option value="machinery">Agro-vehicles and parts</option>
                    <option value="products">Crop treatment products</option>
                    <option value="services">Agro-services</option>
                    <option value="others">Others</option>
                </select>
            </li>
          </ul>
        </div>
      </div> 
    )
}