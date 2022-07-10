import styles from "./css/carousel.module.css"
import {v4 as uuidv4} from 'uuid'
import { useState } from "react"
import { CarouselSlide } from "./CarouselSlide"
import { BtnSlideRight } from "./BtnSlideRight"
import { BtnSlideLeft } from "./BtnSlideLeft"

export const Carousel = (props) => {
   const [slideIndex, setSlideIndex] = useState(1)
   const nextSlide = () => {
      if(slideIndex !== props.news.length){
        setSlideIndex(slideIndex => slideIndex + 1)
      }
      else if( slideIndex === props.news.length){
        setSlideIndex(1)
      }
   }
   const previousSlide = () => {
      if(slideIndex !== 1){
        setSlideIndex(slideIndex => slideIndex - 1)
      }
      else if(slideIndex === 1){
        setSlideIndex(props.news.length)
      }
   }

   const moveIndicator = (index) => setSlideIndex(index)

    return (
        <div className={styles.carousel}>
           <BtnSlideLeft moveSlide={previousSlide}/>
            <div className={styles['carousel_track-container']}>
                <ul className={styles.carousel_track}>
                     {props.news.length > 0
                      ? (props.news.map((news, index) => {
                        return(
                            <li key={uuidv4()} className={slideIndex === index + 1
                             ? styles.carousel_slide + " " + styles.active_anim
                             : styles.carousel_slide
                            }>
                                <img className={styles.carousel_image} src={news.urlToImage} />
                                <div className={styles.title_descr}>
                                <a href={news.url}>{news.title}</a>
                                <p>{news.description}</p>
                                </div>
                            </li>
                        )
                      }))
                      : (<h1>No recent news available...</h1>)
                     }
                </ul>
            </div>
            <BtnSlideRight moveSlide={nextSlide}/>
            <div className={styles.carousel_nav}>
                    {Array.from({length:props.news.length}).map((btn, index) => {
                        return <button className={slideIndex === index + 1
                         ? styles['carousel_indicator-active']
                         : styles.carousel_indicator 
                        } key={uuidv4()} onClick={() => moveIndicator(index + 1)}></button>
                    })}
            </div>
        </div>)
}