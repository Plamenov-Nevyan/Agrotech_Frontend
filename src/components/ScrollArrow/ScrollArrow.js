import { useState, useEffect } from "react"
import styles from "./scrollArrow.module.css"

export const ScrollArrow = () => {
    const [showArrow, setShowArrow] = useState(false)
    useEffect(() => {
        window.addEventListener('scroll', checkScrollHeight)
    }, [])
    
    const checkScrollHeight = () => {
        if(window.pageYOffset > 1000){
            setShowArrow(true)
        }
        else {
            setShowArrow(false)
        }
    }

    const scrollToTop = () => {
        window.scrollTo({top: 0, behavior: 'smooth'})
    }

    

    return (
        <button className={showArrow ? styles.scrollArrow : styles['scrollArrow-hidden']} onClick={scrollToTop}>
             &#8679;
        </button>
    )
}