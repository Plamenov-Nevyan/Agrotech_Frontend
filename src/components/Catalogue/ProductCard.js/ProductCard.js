import { Link } from "react-router-dom"
import styles from "../css/card.module.css"

export const ProductCard = (props) => {

  return (
    <div className={styles['product-card']}>
      <div className={styles.badge}>{props.createdAt.split('T')[0]}</div>
      <div className={styles['product-tumb']}>
        <img src={props.image} alt="" />   
      </div>
      <div className={styles['product-details']}>
        <span className={styles['product-catagory']}>
        {props.publicationType === 'product' || props.publicationType === 'product' && props.name}
        {props.publicationType === 'service' && props.serviceType}
        {props.publicationType === 'vehicle' || props.publicationType === 'inventory' && props.model}
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
            {props.price} $
          </div>
          <div className={styles['product-links']}>
            <a href="">
              <i className="fa fa-heart" />
            </a>
            <a href="">
              <i className="fa fa-shopping-cart" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}