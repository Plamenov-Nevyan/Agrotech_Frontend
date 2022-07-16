import styles from "../css/details.module.css"

export const ServiceInfo = ({publDetails}) => {
    return(
        <>
        <h1 className={styles.info_title}>Type : {publDetails.serviceType}</h1>
        <h1 className={styles.info_title}>Price : {publDetails.price}$</h1>
        <h1 className={styles.info_title}>Available until : {publDetails.availableUntil}</h1>
        <h1 className={styles.info_title}>
                Description:
            <p className={styles.descr_p}>{publDetails.description}</p>
        </h1>
        </>
    )
}