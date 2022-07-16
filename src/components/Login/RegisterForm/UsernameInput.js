import styles from "../css/login.module.css"

export const UsernameInput = ({value, onChangeHandler}) => {
    return (
    <>
    <div className= {styles.label_holder}>
            <label className= {styles.input_label} htmlFor="username"> Username </label>
            </div>
     <div className={styles.input_holder}>
        <input
            type="text"
            id={styles.username}
            className={styles.fadeIn + " " + styles.second}
            name="username"
            placeholder="Your username.."
            defaultValue={value}
            onChange={(e) => onChangeHandler(e)}
        />
    </div>
    </>
    )
}