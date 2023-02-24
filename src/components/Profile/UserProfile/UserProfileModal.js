import styles from "./css/userProfModal.module.css"
import { getUserProfile } from "../../../services/profileServices"
import {useEffect, useState} from "react"
import {SmallLoadingSpinner} from "../../SmallLoadingSpinner/SmallLoadingSpinner"
import {UserPublicationStats} from "../UserPublicationStats/UserPublicationStats"

export const UserProfileModal = ({userId, onCloseModalHandler}) => {
    const [profileData, setProfileData] = useState(null)
    const [errors, setErrors] = useState([])
   
   useEffect(() => {
    getUserProfile(userId)
    .then((receivedData) => setProfileData({...receivedData}))
    .catch((err) => setErrors((oldErrors) => setErrors([...oldErrors, err.message])))
   }, [])

    return (
    <>
    {profileData === null 
    ? <SmallLoadingSpinner />
    : <div id="popup1" className={styles.overlay}>
        <div className={styles.popup}>
            <h2>{profileData.username}'s Profile</h2>
                <a className={styles.close} href="#" onClick={onCloseModalHandler}>&times;</a>
                    <div className={styles.content}>
                        <div className={styles['images-holder']}>
                            <img className={styles.cover} src={profileData.coverImage} />
                            <img className={styles["prof-pic"]} src={profileData.image}/>
                        </div>
                        <UserPublicationStats 
                        createdPublLength={profileData.publicationsCreated.length}
                        likedPublLength = {profileData.publicationsLiked.length}
                        followedPublLength = {profileData.publicationsFollowed.length}
                        />
                    </div>
        </div>
      </div>
}
</>
    )
}