import styles from "./css/details.module.css"

export const ImageWrapper = () => {
    return(
        <div className={styles.product_card_wrapper}>
  <div className={styles.product_image}>
    <div className={styles.author}>
      <p>
        Publication added by:{" "}
        <span>
          <a href="/profile/user">Pesho</a>
        </span>
      </p>
    </div>
    <img className={styles.product} src="https://www.lawnandpetal.com/wp-content/uploads/2021/09/roundup.jpg" />
    <div className={styles.title}>
      <h2>Product name</h2>
      <a href="/like" className={styles.like_btn}>
        <p className={styles.likes}>
          <i className="fa fa-thumbs-up" aria-hidden="true" /> : 23
        </p>
      </a>
      <h3>155$</h3>
    </div>
  </div>
</div>
    )
}