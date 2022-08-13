import { useState } from "react"
import { Link } from "react-router-dom"
import { useShoppingCart } from "../../hooks/useShoppingCart"
import styles from "./css/details.module.css"
import { ChooseQuantity } from "./ChooseQuantity"
import { ContactOwner } from "./ContactOwner"
import { InventoryInfo } from "./InfoFields.js/InventoryInfo"
import { OtherInfo } from "./InfoFields.js/OtherInfo"
import { ProductInfo } from "./InfoFields.js/ProductInfo"
import { ServiceInfo } from "./InfoFields.js/ServiceInfo"
import { VehicleInfo } from "./InfoFields.js/VehicleInfo"
import { ErrorAlert } from "../Alerts/Error"
import { ConfirmModal } from "./ConfirmModal/ConfirmModal"

export const InfoWrapper = ({ publDetails, userData }) => {
    const [errors, setErrors] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [contactMethod, setContactMethod] = useState('')
     const [showContactOrQuantity, setShowContactOrQuantity] = useState(false)
     const [items,createCart, addToCart, removeFromCart] = useShoppingCart()
     const [isItemAddedToCart, setIsItemAddedToCart] = useState(() => items.some(item => item._id === publDetails._id))

     const onClickHandler = () => {
        if(showContactOrQuantity){
            setShowContactOrQuantity(false)
            contactMethod !== '' && setContactMethod('')
        } 
        else {setShowContactOrQuantity(true)}
     }

     const onErrorHandler = (errors) => setErrors(oldErrors => [...oldErrors, ...errors])

     const onAddHandler = (e, quantity) => {
        e.preventDefault()

        addToCart(publDetails._id, quantity) 
        setIsItemAddedToCart(true)
    }

    const onRemoveHandler = (e, quantity) => {
        e.preventDefault()
        removeFromCart(publDetails._id, quantity)
        items.some(item => item._id === publDetails._id) ? setIsItemAddedToCart(true) : setIsItemAddedToCart(false)
    }

    const onContactMethodChange = (e) => setContactMethod(e.target.value)
    const onCloseHandler = () => setShowModal(state => false)
    const onDeleteClick = () => setShowModal(state => true)

    let isSoldOut = publDetails.quantity < 1
      
    return (
        <>
        {showModal && <ConfirmModal 
        onCloseHandler={onCloseHandler} 
        onErrorHandler={onErrorHandler} 
        accessToken={userData.accessToken}
        publicationId={publDetails._id}
        followers={publDetails.followedBy}
        owner = {publDetails.owner}
        />
        }
        <div className={styles.product_info_wrapper}>
            <div className={styles.info}>
                <div className={styles.h1_info_container}>
                    {publDetails.publicationType === 'product' && <ProductInfo publDetails={publDetails} />}
                    {publDetails.publicationType === 'vehicle' && <VehicleInfo publDetails={publDetails} />}
                    {publDetails.publicationType === 'service' && <ServiceInfo publDetails={publDetails} />}
                    {publDetails.publicationType === 'inventory' && <InventoryInfo publDetails={publDetails} />}
                    {publDetails.publicationType === 'other' && <OtherInfo publDetails={publDetails} />}
                </div>
                <div className={styles.buttons}>
                { userData
                    ? publDetails.owner._id === userData._id
                        ? <>
                            <Link to={`/edit/${publDetails._id}`}>
                                Edit  <i className="fas fa-edit" />
                            </Link>
                            <button className={styles.del_btn} onClick={onDeleteClick}>
                                Delete  <i className="fa fa-trash" aria-hidden="true" />
                            </button>
                        </>
                        : <>
                           {publDetails.publicationType !== 'product'
                             ? publDetails.publicationType !== 'other'
                                ? <button className={styles.contact_btn} onClick={onClickHandler}>Contact the owner<i class="fas fa-shopping-cart"></i></button>
                                : !isSoldOut && <button className={styles.contact_btn} onClick={onClickHandler}>
                                     {isItemAddedToCart
                                      ? 'Remove from shopping cart'
                                      : `Add to shopping cart` 
                                    }
                                </button>
                             : !isSoldOut && <button className={styles.contact_btn} onClick={onClickHandler}>
                                 {isItemAddedToCart
                                      ? 'Remove from shopping cart'
                                      : `Add to shopping cart` 
                                    }
                             </button>
                           }
                        </>
                    : <h2>Login or Sign Up if you want to buy !</h2>
                    }
                </div>
                {showContactOrQuantity
                  ? publDetails.quantity  
                     ? <ChooseQuantity 
                         quantity={publDetails.quantity} 
                         onAddHandler={onAddHandler}
                         onRemoveHandler={onRemoveHandler}
                         isItemAddedToCart={isItemAddedToCart}
                         item={items.find(item => item._id === publDetails._id)}
                      />  
                     : <div>
                        <label htmlFor="contactMethod">By Phone</label>
                        <input name="contactMethod" value="phone" type="radio"
                        onChange={(e) => onContactMethodChange(e)}
                       />
                        <label htmlFor="contactMethod">By Message</label>
                        <input name="contactMethod" value="message" type="radio"
                        onChange={(e) => onContactMethodChange(e)}
                        />
                     </div>
                  : ''
                }
                <ContactOwner 
                owner={publDetails.owner}
                 contactMethod={contactMethod} 
                 userData={userData} 
                 setErrors={setErrors}/>
            </div>
        </div>
        </>
    )
}