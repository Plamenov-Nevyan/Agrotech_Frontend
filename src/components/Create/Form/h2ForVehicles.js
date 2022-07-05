import styles from "../css/form.module.css"

export const H2ForVehicles = () => {
    return (
        <>
            <h2 id="products_others" className={styles.underlineHover + " " + styles.inactive}> Products/Others </h2>
           <h2 id="agro_vehicles_parts" className={styles.active}>Agro-vehicles/parts</h2>
           <h2 id="agro_services" className={styles.underlineHover + " " + styles.inactive}>Agro-services</h2>
        </>
    )
}