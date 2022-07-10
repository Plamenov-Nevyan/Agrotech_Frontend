import styles from "./css/carousel.module.css"

export const BtnSlideRight = ({moveSlide}) => {
    return(
        <button className={styles.carousel_btn + " " + styles['carousel_btn--right']} onClick={moveSlide}>
        <img src="https://drive.google.com/uc?export=view&id=16Iw28PlddeEMeuybxRCd7WtkONGN08k6" />
    </button>
    )
}