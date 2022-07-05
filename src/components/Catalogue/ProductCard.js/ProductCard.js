import styles from "../css/card.module.css"

export const ProductCard = () => {
    return(
        <div className={styles['a-box']}>
  <div className={styles['img-container']}>
    <div className={styles['img-inner']}>
      <div className={styles['inner-skew']}>
        <img src="https://www.lawnandpetal.com/wp-content/uploads/2021/09/roundup.jpg" />
      </div>
    </div>
  </div>
  <div className={styles['text-container']}>
    <h3>A blue bird</h3>
    <div><a id={styles['details-btn']} href="/details">More Details</a></div>
  </div>
</div>
    )
}