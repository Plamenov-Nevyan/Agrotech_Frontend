import styles from "../css/search.module.css"

export const Search = ({value, onSearch}) => {
  // Set the search parameter state in the Catalogue component and render search input/button
    return (
        <div className= {styles.search_form_container}>
            <form className={styles.search_form} onSubmit={(e) => onSearch(e)}>
              <div className={styles.input_wrapper}>
             <label htmlFor="search">Search  product, vehicle or service:</label>
             <input 
             type="search" 
             name="search" 
             id={styles.name_input} 
             defaultValue={value}
             />
             <button className={styles.search_btn}>Search</button>
             </div>
            </form>
          </div>
    )
}