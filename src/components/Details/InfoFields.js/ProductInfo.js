import styles from "../css/details.module.css"

export const ProductInfo = ({publDetails}) => {
    return(
        <>
         <h1 className={styles.info_title}>{publDetails.name}</h1>
                <h1 className={styles.info_title}>{publDetails.price}$</h1>
                <h1 className={styles.info_title}>Producer : {publDetails.producedBy}</h1>
                <h1 className={styles.info_title}>Quantity Available : {publDetails.quantity} </h1>
                <h1 className={styles.info_title}>
                    Description:
                    <p className={styles.descr_p}>{publDetails.description}</p>
                </h1>
                <h1 className={styles.info_title}>Recommended dosage : {publDetails.dosage}ml/l </h1>
                <h1 className={styles.info_title}>Type: {publDetails.productType}</h1>
        </>
    )
}