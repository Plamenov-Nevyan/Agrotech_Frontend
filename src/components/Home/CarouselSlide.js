import styles from "./css/carousel.module.css"

export const CarouselSlide = (props) => {
    return (  
    <li className={styles.carousel_slide}>
        <img className={styles.carousel_image} src={props.urlToImage} />
        <div className={styles.title_descr}>
        <a href={props.url}><h2>{props.title}</h2></a>
        <p>{props.description}</p>
        </div>
     </li>
    )
}