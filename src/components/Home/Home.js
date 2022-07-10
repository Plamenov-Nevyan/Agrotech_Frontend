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
                        <h2>About Me</h2>
                        <div className={styles.fakeimg} style={{ height: 100 }}>
                            <img src='https://drive.google.com/uc?export=view&id=1J_8BqjhdNbzF-ewVtWezw4F2b9rw2s7e' />
                        </div>
                        <p>Some text about me in culpa qui officia deserunt mollit anim..</p>
                    </div>
                    <div className={styles.card}>
                        <h3>Popular Post</h3>
                        <div className={styles.fakeimg}>
                            <p>Image</p>
                        </div>
                        <div className={styles.fakeimg}>
                            <p>Image</p>
                        </div>
                        <div className={styles.fakeimg}>
                            <p>Image</p>
                        </div>
                    </div>
                    <div className={styles.card}>
                        <h3>Follow Me</h3>
                        <p>Some text..</p>
                    </div>
                </div>
            </div>
        </>
    )
}