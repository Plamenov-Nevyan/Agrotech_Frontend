import {useState} from "react"
import styles from "./css/addDescription.module.css"
import { addDescription } from "../../../services/profileServices"

export const AddDescription = ({userData}) => {
    const [description, setDescription] = useState('')
    const [showSuccess, setShowSuccess] = useState(false)
    const onDescrChange = (descrText) => setDescription(descrText)
    const onSubmit = (e) => {
        console.log(description)
      e.preventDefault()
      addDescription(userData, description)
      .then(() => setShowSuccess(true))
      .catch(err => console.log(err))
    }

    return(
    <form className={styles["user-descr-form"]} onSubmit={(e) => onSubmit(e)}>
        <label className={styles["descr-label"]} htmlFor="user-description">Describe who you are.</label>
        <textarea 
        className={styles["user-description"]} 
        name="user-description"
        value={description}
        onChange={(e) => onDescrChange(e.target.value)}
        >
        
        </textarea>
        <button className={styles["save-descr-btn"]}>Save description</button>
    </form>
    )
}