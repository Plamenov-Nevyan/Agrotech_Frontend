import styles from "../css/search.module.css"

export const Search = () => {
    return (
        <div className= {styles.search_form_container}>
            <form className={styles.search_form}>
              <div className={styles.input_wrapper}>
             <label htmlFor="search">Search specific product or service</label>
             <input type="search" name="search" id={styles.name_input}/>
             </div>
             <div className={styles.input_wrapper}>
             </div>
            </form>
          </div>
    )
}