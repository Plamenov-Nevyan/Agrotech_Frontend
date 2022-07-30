import {useEffect, useState} from 'react'
import { useLocation } from 'react-router-dom'
import styles from "./css/home.module.css"
import { Carousel } from "./Carousel/Carousel"
import { RecentPublications } from "./RecentPublications/RecentPublications"
import { Sponsors } from "./Sponsors/Sponsors"
import { SuccessAlert } from "../Alerts/Success"

export const Home = () => {
   const [news, setNews] = useState({})
   const [showSuccessAlert, setShowSuccessAlert] = useState(false)
   const location = useLocation()

   useEffect(() => {
       const getNews = async() => {
           let resp  = await fetch('http://localhost:5000')
           let newsReceived = await resp.json()
           setNews(newsReceived)
        }
        getNews()
    }, [])

    useEffect(() => {
    if(location.state !== null && location.state.showSuccessAlert){
     setShowSuccessAlert(true)
    }
    }, [location])

    return (
        <>
        {showSuccessAlert && <SuccessAlert message={`Goodbye, ${location.state.username}`}/>}
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
                    <Sponsors />
                </div>
            </div>
            <RecentPublications />
        </>
    )
}