import styles from "../css/sort.module.css"

export const Sort = ({typesToShow}) => {
    // Set the sorting type of the publications in the Catalogue component and render sorting select
    return(
        <div className={styles.sort_container}>
        <label className={styles.sort_by_label} htmlFor="sort-by"> Sort by:</label>
        <select className={styles.sort_by} name="sort-by" id="sort-by" onChange={(e) => typesToShow(e.target.value)}>
            <option value="mostRecent">Most recent</option>
            <option value="oldest">Oldest</option>
            <option value="mostPopular">Most popular</option>
            <option value="leastPopular">Least popular</option>
            <option value="mostExpensive">Most expensive</option>
            <option value="cheapest">Most cheapest</option>
        </select> 
        </div>
    )
}