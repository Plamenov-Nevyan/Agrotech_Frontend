import styles from "../css/search.module.css"

export const Search = () => {
    return (
        <div className= {styles.search_form_container}>
            <form className={styles.search_form}>
              <div className={styles.input_wrapper}>
             <label for="search">Search specific product or service</label>
             <input type="search" name="search" id={styles.name_input}/>
             </div>
             <div className={styles.input_wrapper}>
             <label for="search-type">Type</label>
             <select name="search-type" id={styles.type_input}>
                    <option value="all">All</option>
                    <option value="machinery">Agro-vehicles and parts</option>
                    <option value="products">Crop treatment products</option>
                    <option value="services">Agro-services</option>
                    <option value="others">Others</option>
             </select>
             </div>
            </form>
          </div>
    )
}