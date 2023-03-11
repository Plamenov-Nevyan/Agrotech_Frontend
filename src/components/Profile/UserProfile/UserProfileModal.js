import styles from "./css/userProfModal.module.css"
import { getUserProfile } from "../../../services/profileServices"
import {useEffect, useState} from "react"
import {SmallLoadingSpinner} from "../../SmallLoadingSpinner/SmallLoadingSpinner"
import {UserPublicationStats} from "../UserPublicationStats/UserPublicationStats"
import { sendMessage } from "../../../services/messageServices"


export const UserProfileModal = ({userData,ownerId, onCloseModalHandler, errorsSetter, successMessageSetter, isUserLogged}) => {
    const [profileData, setProfileData] = useState(null)
    const [message, setMessage] = useState('')
   
   useEffect(() => {
    getUserProfile(ownerId)
    .then((receivedData) => setProfileData({...receivedData}))
    .catch((err) => {
        errorsSetter(err.message)
        onCloseModalHandler()
    })
   }, [])

   const onMessageChange = (e) => setMessage(e.target.value)

   const sendMessageHandler = (e) => {
    if(message === ''){
      errorsSetter('You cannot send an empty message!')
      return onCloseModalHandler()
    }
      e.preventDefault()
      let data = {
        sender : userData._id,
        receiver : ownerId,
        content : message.trim(),
    }
    sendMessage(data, userData.accessToken)
    .then((resp) => {
        onCloseModalHandler()
        successMessageSetter('Message sent successfully !')
    })
    .catch(err => {
        errorsSetter(err.message)
        onCloseModalHandler()
    })
   }

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
                        {isUserLogged && <div className={styles['send-message-form']}>
                        <textarea className={styles.message} onChange={(e) => onMessageChange(e)}>

                        </textarea>
                        <span className={styles['message-btn']} onClick={(e) => sendMessageHandler(e)}>Send a message</span>
                        </div> 
                        }
                    </div>
        </div>
      </div>
}
</>
    )
}