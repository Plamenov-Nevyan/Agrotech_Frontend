import {useEffect, useState} from 'react'
import { useLocation } from 'react-router-dom'
import styles from "./css/home.module.css"
import { getNews } from '../../services/newsServices'
import { Carousel } from "./Carousel/Carousel"
import { RecentPublications } from "./RecentPublications/RecentPublications"
import { Sponsors } from "./Sponsors/Sponsors"
import { SuccessAlert } from "../Alerts/Success"
import {ErrorAlert} from "../Alerts/Error"
import { SmallLoadingSpinner } from '../SmallLoadingSpinner/SmallLoadingSpinner'

export const Home = () => {
   const [news, setNews] = useState(null)
   const [showSuccessAlert, setShowSuccessAlert] = useState(false)
   const [errors, setErrors] = useState([])
   const location = useLocation()

   useEffect(() => {
       getNews()
        .then((newsReceived) => setNews(newsReceived))
        .catch(err => setErrors(oldErrors => [...oldErrors, err]))
    }, [])

    useEffect(() => {
    if(location.state !== null && location.state.showSuccessAlert){
     setShowSuccessAlert(true)
    }
    }, [location])

    return (
        <>
        {errors.length > 0 && <ErrorAlert errors={errors}/>}
        {showSuccessAlert && <SuccessAlert message={`Goodbye, ${location.state.username}`}/>}
            <div className={styles.row}>
                <div className={styles.leftcolumn}>
                  {news !== null
                  ? news.hasOwnProperty('articles')
                     ? <Carousel news={news.articles} />
                     : <h1>No news found...</h1>
                  : <SmallLoadingSpinner />
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