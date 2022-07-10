import styles from "./subheader.module.css"

export const SubHeader = (props) => {

  //  const selectTypeHandler = (e) => {
  //   let selectedOption = e.currentTarget.options[e.currentTarget.selectedIndex]
  //   console.log(selectedOption);
  //   props.typesToShow(selectedOption.value)
  //  }




    return(
        <div className={styles['hero-image']}>
        <div className={styles['hero-text']}>
          <h1>Welcome to our marketplace, review the latest and most popular offers for the modern agriculture</h1>
          <p></p>
          <ul>
              <li>
                <label htmlFor="sort-by"> Sort by:</label>
                <select name="sort-by" id="sort-by" onChange={(e) => props.typesToShow(e.target.value)}>
                    <option value="mostRecent">Most recent</option>
                    <option value="oldest">Oldest</option>
                    <option value="mostPopular">Most popular</option>
                    <option value="leastPopular">Least popular</option>
                    <option value="mostExpensive">Most expensive</option>
                    <option value="cheapest">Most cheapest</option>
                </select>
            </li>
          </ul>
        </div>
      </div> 
    )
}