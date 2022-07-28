import { useState } from "react"
import styles from "./css/details.module.css"
import { ChooseQuantity } from "./ChooseQuantity"
import { ContactOwner } from "./ContactOwner"
import { InventoryInfo } from "./InfoFields.js/InventoryInfo"
import { OtherInfo } from "./InfoFields.js/OtherInfo"
import { ProductInfo } from "./InfoFields.js/ProductInfo"
import { ServiceInfo } from "./InfoFields.js/ServiceInfo"
import { VehicleInfo } from "./InfoFields.js/VehicleInfo"

export const InfoWrapper = ({ publDetails, userData }) => {
     const [showContactOrQuantity, setShowContactOrQuantity] = useState(false)
     const onClickHandler = () => {
        showContactOrQuantity ?  setShowContactOrQuantity(false) : setShowContactOrQuantity(true)
     }
      
    return (
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
                            <a href="/edit">
                                Edit <i className="fas fa-edit" />
                            </a>
                            <a href="/delete">
                                Delete <i className="fa fa-trash" aria-hidden="true" />
                            </a>
                        </>
                        : <>
                           {publDetails.publicationType !== 'product'
                             ? publDetails.publicationType !== 'other'
                                ? <button className={styles.contact_btn} onClick={onClickHandler}>Contact the owner<i class="fas fa-shopping-cart"></i></button>
                                : <button className={styles.contact_btn} onClick={onClickHandler}>Add to shopping cart<i class="fas fa-shopping-cart"></i></button>
                             : <button className={styles.contact_btn} onClick={onClickHandler}>Add to shopping cart<i class="fas fa-shopping-cart"></i></button>
                           }
                        </>
                    : <h2>Login or Sign Up if you want to buy !</h2>
                    }
                </div>
                {showContactOrQuantity
                  ? publDetails.quantity  
                     ? <ChooseQuantity quantity={publDetails.quantity} />  
                     : <ContactOwner owner={publDetails.owner}/>
                  : ''
                }
            </div>
        </div>

    )
}