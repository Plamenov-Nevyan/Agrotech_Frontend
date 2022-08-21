import { Link } from "react-router-dom"
import styles from "../css/card.module.css"

export const ProductCard = (props) => {
  
  return (
    <div className={styles['product-card']}>
      <div className={styles.badge}>{props.createdAt.split('T')[0]}</div>
      <div className={styles['product-tumb']}>
        <img src={props.image} alt="Publication Image" />   
      </div>
      <div className={styles['product-details']}>
        <span className={styles['product-catagory']}>
    
        {props.publicationType === 'product' && props.name}
        {props.publicationType === 'other' && props.name}
        {props.publicationType === 'service' && props.serviceType}
        {props.publicationType === 'vehicle' && props.model}
        {props.publicationType === 'inventory' && props.model}

        </span>

        <h4>
        <Link to={`/catalogue/details/${props._id}`}>See details</Link> 
        </h4>

            {props.publicationType === 'product' && <p>{props.productType}</p>}
            {props.publicationType === 'service' &&<p>Available until : {props.availableUntil} </p>}
            {props.publicationType === 'vehicle' && <p>{props.brand}</p>}
            {props.publicationType === 'inventory' && <p>{props.inventoryType}</p>}
            {props.publicationType === 'other' && <p>Available quantity : {props.quantity}</p>}

        <div className={styles['product-bottom-details']}>
          <div className={styles['product-price']}>
            {props.publicationType === 'product' || props.publicationType === 'other'
            // Show "SOLD OUT" if product quanity is 0 or else just show the quantity
            ? props.quantity > 0
                ? props.price + `$`
                : <h3 className={styles.sold_out_heading}>SOLD OUT !</h3>
            : props.price + `$`
            }
          </div>
          <div className={styles['product-links']}>
            {/* Show the count of people who liked and followed the publication */}
            <a>
              <i className="fa fa-thumbs-up" aria-hidden="true" /> {props.likedBy.length}
            </a>
            <a>
            <i class="fa-solid fa-bookmark" aria-hidden="true"></i> {props.followedBy.length}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}