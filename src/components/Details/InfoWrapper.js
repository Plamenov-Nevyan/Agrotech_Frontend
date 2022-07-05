import styles from "./css/details.module.css"

export const InfoWrapper = () => {
    return (
        <div className={styles.product_info_wrapper}>
            <div className={styles.info}>
                <h1 className={styles.info_title}>Product name</h1>
                <h1 className={styles.info_title}>Price per unit: 155$</h1>
                <h1 className={styles.info_title}>Quantity Available : 4 </h1>
                <h1 className={styles.info_title}>
                    Description:
                    <p className={styles.descr_p}>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro quaerat
                        expedita odio, sit sapiente a. Officiis assumenda officia consequatur
                        inventore libero omnis minus, impedit ad hic labore saepe ratione rem.
                    </p>
                </h1>
                <h1 className={styles.info_title}>Type: Crop treatment product</h1>
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