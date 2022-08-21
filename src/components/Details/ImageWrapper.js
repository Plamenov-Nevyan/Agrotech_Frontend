import { Link } from "react-router-dom"
import styles from "./css/details.module.css"
import {LikeBtn} from './LikeAndFollowBtn/LikeBtn'
import {FollowBtn} from './LikeAndFollowBtn/FollowBtn'
 
export const ImageWrapper = ({publDetails, userData, onModalClickHandler}) => {

  return (
  <div className={styles.product_card_wrapper}>
<div className={styles.product_image}>
<div className={styles.author}>
  <p>
    Publication added by: 
    <span>
      <Link to={`/profile/user/${publDetails.owner._id}`}> {publDetails.owner.username}</Link>
    </span>
  </p>
</div>
 <img className={styles.product} src={publDetails.image} />
<div className={styles.title}>
  <h2 className={styles.title_header}>{
  publDetails.name 
    ? publDetails.name 
    : publDetails.model 
        ? publDetails.model 
        : publDetails.serviceType
      }
  </h2>
  <button className={styles.like_btn}>
    <LikeBtn 
    likes={publDetails.likedBy} 
    publicationId={publDetails._id} 
    userData={userData} 
    ownerId={publDetails.owner._id} 
    onModalClickHandler={onModalClickHandler}
    />
    <FollowBtn 
    follows={publDetails.followedBy} 
    publicationId={publDetails._id} 
    userData={userData} 
    ownerId={publDetails.owner._id} 
    onModalClickHandler={onModalClickHandler}
    />
  </button>
  <h3 className={styles.title_price}>{publDetails.price}$</h3>
</div>
</div>
</div>
  )
}