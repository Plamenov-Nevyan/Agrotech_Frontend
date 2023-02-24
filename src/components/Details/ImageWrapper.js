import styles from "./css/details.module.css";
import { LikeBtn } from "./LikeAndFollowBtn/LikeBtn";
import { FollowBtn } from "./LikeAndFollowBtn/FollowBtn";
import {useState} from "react";
import {UserProfileModal} from "../Profile/UserProfile/UserProfileModal";

export const ImageWrapper = ({
  publDetails,
  userData,
  onModalClickHandler,
  errorsSetter,
  successMessageSetter
}) => {
  const [showModal, setShowModal] = useState(false)
  const onCloseModalHandler = () => setShowModal(false)

  return (
    <>
    {showModal && <UserProfileModal 
    userData={userData} 
    ownerId={publDetails.owner._id} 
    onCloseModalHandler={onCloseModalHandler} 
    errorsSetter={errorsSetter}
    successMessageSetter={successMessageSetter}
    />
    }
    <div className={styles.product_card_wrapper}>
      <div className={styles.product_image}>
        <div className={styles.author}>
          <p>
            Publication added by:
            <span className={styles['owner-modal-link']} onClick={(e) => setShowModal(true)}>
                {" "}
                {publDetails.owner.username}
            </span>
          </p>
        </div>
        <img className={styles.product} src={publDetails.image} />
        <div className={styles.title}>
          <h2 className={styles.title_header}>
            {publDetails.name
              ? publDetails.name
              : publDetails.model
              ? publDetails.model
              : publDetails.serviceType}
          </h2>
          <LikeBtn
            likes={publDetails.likedBy}
            publicationId={publDetails._id}
            userData={userData}
            ownerId={publDetails.owner._id}
            onModalClickHandler={onModalClickHandler}
            errorsSetter={errorsSetter}
            successMessageSetter={successMessageSetter}
          />
          <FollowBtn
            follows={publDetails.followedBy}
            publicationId={publDetails._id}
            userData={userData}
            ownerId={publDetails.owner._id}
            onModalClickHandler={onModalClickHandler}
            errorsSetter={errorsSetter}
            successMessageSetter={successMessageSetter}
          />
          <h3 className={styles.title_price}>{publDetails.price}$</h3>
        </div>
      </div>
    </div>
    </>
  );
};
