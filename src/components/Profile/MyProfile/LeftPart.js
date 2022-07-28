import {Link} from "react-router-dom"
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
        <div className= {styles.stats + " " + styles.row}>
          <div className={styles.stat + ' ' + styles['col-xs-4']} style={{ paddingRight: 50 }}>
            <p className={styles['number-stat']}>{profileInfo.publicationsCreated.length}</p>
            <p className={styles['desc-stat']}>Publications created</p>
          </div>
          <div className={styles.stat + ' ' + styles['col-xs-4']}>
            <p className={styles['number-stat']}>{profileInfo.publicationsLiked.length}</p>
            <p className={styles['desc-stat']}>Publications liked</p>
          </div>
          <div className={styles.stat + ' ' + styles['col-xs-4']} style={{ paddingLeft: 50 }}>
            <p className={styles['number-stat']}>{profileInfo.publicationsFollowed.length}</p>
            <p className={styles['desc-stat']}>Publications followed</p>
          </div>
        </div>
         {profileInfo.description && <p className={styles.desc}>{profileInfo.description}</p>}
        <div className={styles.social}>
          {profileInfo.facebookLink && <Link to={profileInfo.facebookLink}><i class="fab fa-facebook-f"></i></Link>}
          {profileInfo.twitterLink && <Link to={profileInfo.twitterLink}><i class="fab fa-twitter"></i></Link>}
          {profileInfo.instagramLink && <Link to={profileInfo.instagramLink}><i class="fa-brands fa-instagram"></i></Link>}
        </div>
      </div>
    )
}