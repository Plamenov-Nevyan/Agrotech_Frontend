import styles from "../css/card.module.css"

export const ProductCard = (props) => {
  let mlSec = Date.parse(props.createdAt)
  return (
    <div className={styles['product-card']}>
      <div className={styles.badge}>{props.createdAt.split('T')[0]}</div>
      <div className={styles['product-tumb']}>
        <img src={props.image} alt="" />
      </div>
      <div className={styles['product-details']}>
        <span className={styles['product-catagory']}>{props.name}</span>
        <h4>
          <a href="/details">See details</a>
        </h4>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero, possimus
          nostrum!
        </p>
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