import { useState } from "react"
import {AddCoverPic} from "./AddCoverPic"
import {AddDescription} from "./AddDescription"
import { AddProfilePic } from "./AddProfilePic"
import styles from "./css/persModal.module.css"

export const PersonalizationModal = ({onCloseModalHandler, userData}) => {
    const [optionsToShow, setOptionsToShow] = useState('profilePic')

    const optionsSelectHandler = (e) => setOptionsToShow(e.target.id)
    

    return (
        <div id="popup1" className={styles.overlay}>
  <div className={styles.popup}>
    <h2>Add flavour to your profile</h2>
    <a className={styles.close} href="#" onClick={onCloseModalHandler}>&times;</a>
    <div className={styles.content}>
      <div className={styles.chooseOption}>
           <ul className={styles.pers_menu}>
            <li id="profilePic" className={styles.pers_option} onClick={(e) => optionsSelectHandler(e)}>Add profile picture</li>
            <li id="coverPic" className={styles.pers_option} onClick={(e) => optionsSelectHandler(e)}>Add cover picture</li>
            <li id="shortDescr" className={styles.pers_option} onClick={(e) => optionsSelectHandler(e)}>Add short description</li>
           </ul>
      </div>
      <div className={styles.change_container}>
           {optionsToShow === 'profilePic' && <AddProfilePic userData={userData} />}
           {optionsToShow === 'coverPic' && <AddCoverPic userData={userData} />}
           {optionsToShow === 'shortDescr' && <AddDescription userData={userData} />}
      </div>
    </div>
  </div>
</div>
    )
}