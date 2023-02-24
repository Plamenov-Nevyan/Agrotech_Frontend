import {Link} from "react-router-dom"
import {UserPublicationStats} from "../UserPublicationStats/UserPublicationStats"
import styles from "./css/myProfile.module.css"

export const LeftPart = ({profileInfo}) => {
    return(
        <div className={styles.left + ' ' + styles['col-lg-4']}>
        <div className={styles['photo-left']}>
          <img
            className={styles.photo}
            src= {profileInfo.image || `https://drive.google.com/uc?export=view&id=1iMt8_whGlwVVfGofzNKVf7O9bwrNdjnt`}
          />
          <div className={styles.active} />
        </div>
        <h4 className={styles.name}>{profileInfo.username}</h4>
        <p className={styles.info}>{profileInfo.userType}</p>
        <p className={styles.info}>{profileInfo.email}</p>
        <UserPublicationStats 
        createdPublLength={profileInfo.publicationsCreated.length}
        likedPublLength = {profileInfo.publicationsLiked.length}
        followedPublLength = {profileInfo.publicationsFollowed.length}
        />
         {profileInfo.shortDescription && <p className={styles.desc}>{profileInfo.shortDescription}</p>}
        <div className={styles.social}>
          {profileInfo.facebookLink && <Link to={profileInfo.facebookLink}><i class="fab fa-facebook-f"></i></Link>}
          {profileInfo.twitterLink && <Link to={profileInfo.twitterLink}><i class="fab fa-twitter"></i></Link>}
          {profileInfo.instagramLink && <Link to={profileInfo.instagramLink}><i class="fa-brands fa-instagram"></i></Link>}
        </div>
      </div>
    )
}