import styles from "../css/login.module.css"

export const FileInput = () => {
    return(
        <>
        <div className= {styles.label_holder}>
            <label className= {styles.input_label} htmlFor="upload"> Profile Picture </label>
            </div>
        <div className={styles.input_holder}>
            <input type="file" name="upload" id="upload"/>
        </div>
        </>
    )
}