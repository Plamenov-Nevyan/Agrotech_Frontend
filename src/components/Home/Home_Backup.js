import styles from "./css/home.module.css"
import {useEffect} from 'react'
export const Home = () => {
    useEffect(() => {
        const getNews = async() => {
        let resp  = await fetch('http://localhost:5000')
        let news = await resp.json()
         console.log(news)
        }
     getNews()
    }, [])

    return (
        <>
            <div className={styles.row}>
                <div className={styles.leftcolumn}>
                    <div className={styles.card}>
                        <h2>TITLE HEADING</h2>
                        <h5>Title description, Dec 7, 2017</h5>
                        <div className={styles.fakeimg} style={{ height: 200 }}>
                            Image
                        </div>
                        <p>Some text..</p>
                        <p>
                            Sunt in culpa qui officia deserunt mollit anim id est laborum
                            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                            exercitation ullamco.
                        </p>
                    </div>
                    <div className={styles.card}>
                        <h2>TITLE HEADING</h2>
                        <h5>Title description, Sep 2, 2017</h5>
                        <div className={styles.fakeimg} style={{ height: 200 }}>
                            Image
                        </div>
                        <p>Some text..</p>
                        <p>
                            Sunt in culpa qui officia deserunt mollit anim id est laborum
                            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                            exercitation ullamco.
                        </p>
                    </div>
                </div>
                <div className={styles.rightcolumn}>
                    <div className={styles.card}>
                        <h2>About Me</h2>
                        <div className={styles.fakeimg} style={{ height: 100 }}>
                            Image
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