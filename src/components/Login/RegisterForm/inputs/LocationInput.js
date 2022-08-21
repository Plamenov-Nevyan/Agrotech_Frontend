import styles from "../../css/login.module.css"

export const LocationInput = ({value, onChangeHandler}) => {
 
    return (
        <>
            <div className={styles.label_holder}>
                <label className={styles.input_label} htmlFor="location"> Where is your main office </label>
            </div>
            <div className={styles.input_holder}>
                <input
                    type="text"
                    id={styles.email}
                    className={styles.fadeIn + " " + styles.second}
                    name="location"
                    placeholder="Your location(Country, City)"
                    value={value}
                    onChange={(e) => onChangeHandler(e)}
                />
            </div>
        </>
    )
}