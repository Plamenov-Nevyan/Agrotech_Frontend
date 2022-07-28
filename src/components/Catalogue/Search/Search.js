import styles from "../css/search.module.css"

export const Search = ({value, onSearch}) => {
    return (
        <div className= {styles.search_form_container}>
            <form className={styles.search_form} onSubmit={(e) => onSearch(e)}>
              <div className={styles.input_wrapper}>
             <label htmlFor="search">Search specific product or service</label>
             <input 
             type="search" 
             name="search" 
             id={styles.name_input} 
             defaultValue={value}
             />
             <button className={styles.search_btn}>Search</button>
             </div>
             <div className={styles.input_wrapper}>
             </div>
            </form>
          </div>
    )
}