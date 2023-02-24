import { useState } from "react"
import styles from "./css/myProfile.module.css"

export const Header = ({coverImage, showModalHandler}) => {

   const [showOptions, setShowOptions] = useState(false)

   const onClickHandler = () => setShowOptions(!showOptions)

   console.log(showOptions)

   return ( 
   <header className={styles.my_prof_header}>
    <img className={styles.prof_cover_image} src={coverImage}/>
    <i className="fa fa-bars" aria-hidden="true" onClick={onClickHandler} />
    <div className={
      showOptions 
      ? styles['prof_options_container-visible']
      : styles['prof_options_container-hidden']
    }>
      <ul className={styles.options_menu}>
        <li><div className={styles.option}><p onClick={showModalHandler}>Personalize your profile</p></div></li>
        <li><div className={styles.option}><p>Change username</p></div></li>
        <li><div className={styles.option}><p>Change email</p></div></li>
        <li><div className={styles.option}><p>Change password</p></div></li>
        <li><div className={styles.option}><p>Delete created publications</p></div></li>
        <li><div className={styles.option}><p>Clear liked publications </p></div></li>
        <li><div className={styles.option}><p>Clear followed publications </p></div></li>
      </ul>
    </div>
  </header>
   )
}