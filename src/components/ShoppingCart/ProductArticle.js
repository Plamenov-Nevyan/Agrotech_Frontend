import styles from "./css/shoppingCart.module.css"

export const ProductArticle = ({product, prices, onRemoveHandler}) => {

  let productPrice = prices.find(productRegistered => productRegistered._id === product._id).individualPriceTotal

  return (
    <article className={styles.product}>
        <header>
          <a className={styles.remove + ' ' + styles.anchor_btn} onClick={() => onRemoveHandler(product._id)}>
            <img
              src={product.image}
              alt="Product image"
            />
            <h3>Remove product</h3>
          </a>
        </header>
        <div className={styles.content}>
        <h4>Seller : {product.owner.userType === 'individual' ? product.owner.username : product.owner.email}</h4>
          <span>Total price for all added items : {productPrice}$</span>
          <h1>{product.name}</h1>
           {product.description}
        </div>
        <footer className={styles.content}>
          <span className="qt">Quantity : {product.quantity}</span>
          <h2 className={styles['full-price']}>Price per item : {product.price}$</h2>
        </footer>
      </article>
  )
} 