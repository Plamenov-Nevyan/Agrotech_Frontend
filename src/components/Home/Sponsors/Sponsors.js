import { useState, useEffect } from "react"
import styles from "../css/home.module.css"
const sponsorImages = [
    'https://drive.google.com/uc?export=view&id=1qOL-2MsXUSkCD1OGCnxW68EuCIlUtXoM',
    'https://drive.google.com/uc?export=view&id=1_B5E7ImkF3zw_AEqivmeZ2zZ2R3_8vnv',
    'https://drive.google.com/uc?export=view&id=1a3a1JzuOc2UuwffUsWrMVqZgZ7KMOa3G'
]

export const Sponsors = () => {
   const [currentSponsor, setCurrentSponsor] = useState(0)

   const switchSponsor = () => {
    if(currentSponsor + 1 <= sponsorImages.length){
        setCurrentSponsor(previousImage => previousImage + 1)
    }
    else {setCurrentSponsor(previousImage => previousImage - sponsorImages.length)}
   }
   
  useEffect(() => {
     setTimeout(switchSponsor, 3000)
  }, [currentSponsor])

    return (
        <div className={styles.card}>
            <h3>Our Sponsors</h3>
            <div className={styles.sponsorContainer}>
                <a href="/#"><img className={styles.sponsor_img} src={sponsorImages[currentSponsor]} /></a>
            </div>
        </div>
    )
}