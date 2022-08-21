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
    // Set state for showing the confirm delete publication modal
    const [showModal, setShowModal] = useState(false)
    // Set state for choosing the contact method of the publication owner
    const [contactMethod, setContactMethod] = useState('')
    // Show contact methods when publication type is different than product or other, and add to shopping cart button, if it is
     const [showContactOrQuantity, setShowContactOrQuantity] = useState(false)
     const [items,createCart, addToCart, removeFromCart] = useShoppingCart()
    // Set state for watching if the item is already added to the user's shopping cart
     const [isItemAddedToCart, setIsItemAddedToCart] = useState(() => items.some(item => item._id === publDetails._id))

     const onClickHandler = () => {
        if(showContactOrQuantity){
            // if the contact methods are shown, close them and set the contact method state to default value
            setShowContactOrQuantity(false)
            contactMethod !== '' && setContactMethod('')
        } 
        else {setShowContactOrQuantity(true)}
     }

     const onErrorHandler = (errors) => setErrors(oldErrors => [...oldErrors, ...errors])

     const onAddHandler = (e, quantity) => {
         e.preventDefault()
         
         // Use the addToCart function of useShoppingCart hook, to add the item into the local storage shopping cart
        addToCart(publDetails._id, quantity) 
        setIsItemAddedToCart(true)
    }

    const onRemoveHandler = (e, quantity) => {
        e.preventDefault()
        // Use the removeFromCart function of useShoppingCart hook, to remove the item from the local storage shopping cart
      let updatedItems =  removeFromCart(publDetails._id, quantity)
      updatedItems.some(item => item._id === publDetails._id) ? setIsItemAddedToCart(true) : setIsItemAddedToCart(false)
    }

    // Show either owner phone number or send message form, when changing the contact method
    const onContactMethodChange = (e) => setContactMethod(e.target.value)
    // Function to close the confirm delete publication modal 
    const onCloseHandler = () => setShowModal(state => false)
    // Show  confirm delete publication modal, when clicking the "Delete" button
    const onDeleteClick = () => setShowModal(state => true)

    let isSoldOut = publDetails.quantity < 1
    let isUserLogged = userData !== null
    let isOwner = isUserLogged ? publDetails.owner._id === userData._id : false
      
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
                    {/* Show different info fields depending on the publication type */}
                    {publDetails.publicationType === 'product' && <ProductInfo publDetails={publDetails} />}
                    {publDetails.publicationType === 'vehicle' && <VehicleInfo publDetails={publDetails} />}
                    {publDetails.publicationType === 'service' && <ServiceInfo publDetails={publDetails} />}
                    {publDetails.publicationType === 'inventory' && <InventoryInfo publDetails={publDetails} />}
                    {publDetails.publicationType === 'other' && <OtherInfo publDetails={publDetails} />}
                </div>
                <div className={styles.buttons}>
                { isUserLogged
                    ? isOwner
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
                            //  Show contact owner button if publication type is not product or other
                                ? <button className={styles.contact_btn} onClick={onClickHandler}>Contact the owner<i class="fas fa-shopping-cart"></i></button>
                            // If publication type is product and  is not sold out, show the shopping cart button
                                : !isSoldOut && 
                                <button className={styles.contact_btn} onClick={onClickHandler}>
                                     {isItemAddedToCart
                                    //  Render different text content depending on if the product is in the shopping cart, or not
                                      ? 'Remove from shopping cart'
                                      : `Add to shopping cart` 
                                    }
                                </button>
                             : !isSoldOut && <button className={styles.contact_btn} onClick={onClickHandler}>
                                {/* If publication type is other and is not sold out, render the shopping cart button */}
                                 {isItemAddedToCart
                                      ? 'Remove from shopping cart'
                                      : `Add to shopping cart` 
                                    }
                             </button>
                           }
                        </>
                        // If there is no user logged, render a link to the login/register page
                    : <Link to={'/login'}>Login or Sign Up if you want to buy !</Link>
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