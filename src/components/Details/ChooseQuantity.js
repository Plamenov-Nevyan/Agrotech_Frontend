import {useState} from "react"
import styles from './css/details.module.css'

export const ChooseQuantity = ({quantity}) => {
    const [quantityInput, setQuantityInput] = useState(1)

    const onChangeHandler = (e) => setQuantityInput(e.target.value)
    
    return (
        <div className={styles.quantity_wrapper}>
                    <form className={styles.choose_quantity}>
                        <label htmlFor="quantityChosen">How much you want to order?</label>
                         <input 
                         className={styles.quantity_choose_input}
                         type="number" 
                         id="quantityChosen" 
                         name="quantityChosen"   
                         defaultValue={quantityInput}
                         onChange={(e) => onChangeHandler(e)}
                         />
                        <button type="submit">Add</button>
                    </form>
                </div>
    )
}