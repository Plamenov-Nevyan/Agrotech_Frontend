import styles from "../css/details.module.css"

export const Pager = ({onPageChange, totalPages, currentPage}) => {
    let individualPages = []
    for(let i = 1; i <= totalPages; i++){
        individualPages.push(i)
    }

 return (
     <div className={styles.pager_container}>
     {individualPages.map(page => <button 
        className={currentPage === page
            ? styles.page_btn_selected
            : styles.page_btn
        } 
        onClick={(e) => onPageChange(Number(e.target.textContent))}
        >{page}
        </button>
     )}
     <h4 className={styles.page_text_indicator}>Page {currentPage} of {individualPages.length}</h4>
    </div>
 )
}