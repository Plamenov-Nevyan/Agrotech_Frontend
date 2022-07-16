import { useState, useEffect } from "react"
import styles from "./scrollArrow.module.css"
import {FaArrowCircleUp} from "react-icons/fa"

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
 console.log(showArrow)
    const scrollToTop = () => {
        window.scrollTo({top: 0, behavior: 'smooth'})
    }

    

    return (
        <button className={showArrow ? styles.scrollArrow : styles['scrollArrow-hidden']} onClick={scrollToTop}>
             &#8679;
        </button>
    )
}