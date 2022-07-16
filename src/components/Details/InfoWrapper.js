import styles from "./css/details.module.css"
import { InventoryInfo } from "./InfoFields.js/InventoryInfo"
import { OtherInfo } from "./InfoFields.js/OtherInfo"
import { ProductInfo } from "./InfoFields.js/ProductInfo"
import { ServiceInfo } from "./InfoFields.js/ServiceInfo"
import { VehicleInfo } from "./InfoFields.js/VehicleInfo"

export const InfoWrapper = ({publDetails, userData}) => {
    return (
        <div className={styles.product_info_wrapper}>
            <div className={styles.info}>
                <div className={styles.h1_info_container}>
                 {publDetails.publicationType === 'product' && <ProductInfo publDetails={publDetails}/>}
                 {publDetails.publicationType === 'vehicle' && <VehicleInfo publDetails={publDetails}/>}
                 {publDetails.publicationType === 'service' && <ServiceInfo publDetails={publDetails}/>}
                 {publDetails.publicationType === 'inventory' && <InventoryInfo publDetails={publDetails}/>}
                 {publDetails.publicationType === 'other' && <OtherInfo publDetails={publDetails}/>}
                 </div>
                <div className={styles.buttons}>
                    <a href="/edit">
                        Edit <i className="fas fa-edit" />
                    </a>
                    <a href="/delete">
                        Delete <i className="fa fa-trash" aria-hidden="true" />
                    </a>
                    {/* <a href="/add_to_cart">Add to shopping cart <i class="fas fa-shopping-cart"></i></a>
      <a href="/follow">Follow this publication <i class="fa-solid fa-bookmark"></i></a> */}
                </div>
                <div className={styles.quantity_wrapper}>
                    <form className={styles.choose_quantity}>
                        <label htmlFor="select_quantity">How much you want to order?</label>
                        <select className={styles.select_quantity} name="select_quantity">
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                        </select>
                        <button type="submit">Add</button>
                    </form>
                </div>
            </div>
        </div>

    )
}