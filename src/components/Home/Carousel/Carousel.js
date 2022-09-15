import styles from "../css/carousel.module.css";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { BtnSlideRight } from "./BtnSlideRight";
import { BtnSlideLeft } from "./BtnSlideLeft";

export const Carousel = ({ news }) => {
  const [slideIndex, setSlideIndex] = useState(1);

  const nextSlide = () => {
    if (slideIndex !== news.length) {
      setSlideIndex((slideIndex) => slideIndex + 1);
    } else if (slideIndex === news.length) {
      setSlideIndex((slideIndex) => slideIndex - news.length + 1);
    }
  };
  const previousSlide = () => {
    if (slideIndex !== 1) {
      setSlideIndex((slideIndex) => slideIndex - 1);
    } else if (slideIndex === 1) {
      setSlideIndex(news.length);
    }
  };

  const moveIndicator = (index) => setSlideIndex(index);

  return (
    <div className={styles.carousel}>
      <BtnSlideLeft moveSlide={previousSlide} />
      <div className={styles["carousel_track-container"]}>
        <ul className={styles.carousel_track}>
          {news.length > 0 &&
            news.map((newsArticle, index) => (
              <li
                key={uuidv4()}
                className={
                  slideIndex === index + 1
                    ? styles.carousel_slide + " " + styles.active_anim
                    : styles.carousel_slide
                }
              >
                <img
                  className={styles.carousel_image}
                  src={newsArticle.urlToImage}
                />
                <div className={styles.title_descr}>
                  <a href={newsArticle.url} target="_blank">
                    {newsArticle.title}
                  </a>
                  <p>{newsArticle.description}</p>
                </div>
              </li>
            ))}
        </ul>
      </div>
      <BtnSlideRight moveSlide={nextSlide} />
      <div className={styles.carousel_nav}>
        {Array.from({ length: news.length }).map((btn, index) => {
          return (
            <button
              className={
                slideIndex === index + 1
                  ? styles["carousel_indicator-active"]
                  : styles.carousel_indicator
              }
              key={uuidv4()}
              onClick={() => moveIndicator(index + 1)}
            ></button>
          );
        })}
      </div>
    </div>
  );
};
