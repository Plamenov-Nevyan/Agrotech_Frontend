import styles from "../css/form.module.css"

export const H2ForProducts = () => {
    return (
        <>
            <h2 id="products_others" className={styles.active}> Products/Others </h2>
           <h2 id="agro_vehicles_parts" className={styles.underlineHover + " " + styles.inactive}>Agro-vehicles/parts</h2>
           <h2 id="agro_services" className={styles.underlineHover + " " + styles.inactive}>Agro-services</h2>
        </>
    )
}