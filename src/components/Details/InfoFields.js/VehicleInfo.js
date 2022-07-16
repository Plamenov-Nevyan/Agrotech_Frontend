import styles from "../css/details.module.css"

export const VehicleInfo = ({publDetails}) => {
    return(
        <>
         <h1 className={styles.info_title}>{publDetails.model}</h1>
         <h1 className={styles.info_title}>{publDetails.brand}</h1>
        <h1 className={styles.info_title}>Price : {publDetails.price}$</h1>
        <h1 className={styles.info_title}>Date produced : {publDetails.date}</h1>
        <h1 className={styles.info_title}>Horse Powers : {publDetails.horsePowers}</h1>
        <h1 className={styles.info_title}>Kilometers driven : {publDetails.kilometers}</h1>
        <h1 className={styles.info_title}>
                Description:
            <p className={styles.descr_p}>{publDetails.description}</p>
        </h1>
        </>
    )
}