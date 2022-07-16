import styles from "./css/home.module.css"
import {useEffect, useState} from 'react'
import { Carousel } from "./Carousel"

export const Home = () => {
   const [news, setNews] = useState({})

    useEffect(() => {
        const getNews = async() => {
        let resp  = await fetch('http://localhost:5000')
        let newsReceived = await resp.json()
        setNews(newsReceived)
        }
     getNews()
    }, [])
    return (
        <>
            <div className={styles.row}>
                <div className={styles.leftcolumn}>
                  {news.hasOwnProperty('articles')
                   ? <Carousel news={news.articles} />
                   : <h1>Loading...</h1>
                  }
                </div>
                <div className={styles.rightcolumn}>
                    <div className={styles.card}>
                        <h2>About Us</h2>
                        <div className={styles.fakeimg} style={{ height: 100 }}>
                            <img className={styles.about_img} src='https://drive.google.com/uc?export=view&id=1J_8BqjhdNbzF-ewVtWezw4F2b9rw2s7e' />
                        </div>
                        <p>Learn more about our team</p>
                    </div>
                    <div className={styles.card}>
                        <h3>Our Sponsors</h3>
                        <div className={styles.sponsorContainer}>
                        <a href="/#"><img className={styles.sponsor_img} src='https://drive.google.com/uc?export=view&id=1qOL-2MsXUSkCD1OGCnxW68EuCIlUtXoM' /></a>
                        </div>
                        <div className={styles.sponsorContainer}>
                        <a href="/#"><img className={styles.sponsor_img} src='https://drive.google.com/uc?export=view&id=1_B5E7ImkF3zw_AEqivmeZ2zZ2R3_8vnv' /></a>
                        </div>
                        <div className={styles.sponsorContainer}>
                        <a href="/#"><img className={styles.sponsor_img} src='https://drive.google.com/uc?export=view&id=1a3a1JzuOc2UuwffUsWrMVqZgZ7KMOa3G' /></a>
                        </div>
                    </div>
                    {/* <div className={styles.card}>
                        <h3>Follow Me</h3>
                        <p>Some text..</p>
                    </div> */}
                </div>
            </div>
        </>
    )
}