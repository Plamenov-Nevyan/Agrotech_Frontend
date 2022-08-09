import {useState} from "react"

import styles from './css/details.module.css'

export const ChooseQuantity = ({quantity, onAddHandler, onRemoveHandler, isItemAddedToCart, item}) => {
    const [quantityInput, setQuantityInput] = useState(0)
    
    if(isItemAddedToCart){
        if(quantityInput > item.quantity){
            setQuantityInput(item.quantity)
        }
    }
    else {
        if(quantityInput > quantity){
            setQuantityInput(quantity)
        }
    }

    if(quantityInput < 0){
        setQuantityInput(0)
    }

    const onChangeHandler = (e) => setQuantityInput(e.target.value)

    const setOnMaxQuantity = (e) => {
        e.preventDefault()
        if(isItemAddedToCart){
            setQuantityInput(item.quantity)
        }
        else{setQuantityInput(quantity)}
    }
    
    return (
        <div className={styles.quantity_wrapper}>
                    <form className={styles.choose_quantity}>
                    <label htmlFor="quantityChosen">
                        {isItemAddedToCart
                         ? 'How much do you want to remove?'
                         : 'How much do you want to order?'
                        }
                        </label>
                        <button onClick={(e) => setOnMaxQuantity(e)}>All</button>
                           <input 
                           className={styles.quantity_choose_input}
                           type="number" 
                           id="quantityChosen" 
                           name="quantityChosen"   
                           value={quantityInput}
                           onChange={(e) => onChangeHandler(e)}
                           />
                        {quantityInput > 0
                           ? isItemAddedToCart
                                ? <button type="submit" onClick={(e) => onRemoveHandler(e, quantityInput)}> Remove from Cart</button>  
                                : <button type="submit" onClick={(e) => onAddHandler(e, quantityInput)}> Add to Cart</button> 
                           : null
                        }
                    </form>
                </div>
    )
}