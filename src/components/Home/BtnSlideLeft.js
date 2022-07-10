import styles from "./css/carousel.module.css"

export const BtnSlideLeft = ({moveSlide}) => {
    return(
    <button className={styles.carousel_btn + " " + styles['carousel_btn--left']} onClick={moveSlide}>
        <img src="https://drive.google.com/uc?export=view&id=1PJrLRGQEAU_9u2waPs5lKML5lHHNm8O6" />
    </button>
    )
}