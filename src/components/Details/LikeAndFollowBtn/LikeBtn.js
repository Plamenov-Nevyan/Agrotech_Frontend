import {useState} from "react"
import styles from "../css/details.module.css"
import {likeOrFollow} from "../../../services/publicationServices"

export const LikeBtn = ({likes, publicationId,userData, ownerId, onModalClickHandler}) => {
    const [currentLikes, setCurrentLikes] = useState(likes)


    const onLikeHandler = () => {
      likeOrFollow(publicationId, 'like')
      .then(newLikes => setCurrentLikes(newLikes))
      .catch(err => console.log(err))
    }

    return (
     <>   
  {userData
    ? userData._id !== ownerId 
      ? currentLikes.some((user) => user._id === userData._id)
          ? <p className={styles.likes}>
                <i className="fa fa-thumbs-up" aria-hidden="true" /> :<span onClick={() => onModalClickHandler(currentLikes, 'liked')}>{currentLikes.length}</span>
            </p>
          : <p className={styles.likes} onClick={onLikeHandler}>  
                 <i className="fa fa-thumbs-up" aria-hidden="true" /> :<span onClick={() => onModalClickHandler(currentLikes, 'liked')}>{currentLikes.length}</span>  
            </p>
      : <p className={styles.likes}>
            <i className="fa fa-thumbs-up" aria-hidden="true" /> :<span onClick={() => onModalClickHandler(currentLikes, 'liked')}>{currentLikes.length}</span>
          </p>
    :  <p className={styles.likes}> 
          <i className="fa fa-thumbs-up" aria-hidden="true" /> : <span onClick={() => onModalClickHandler(currentLikes, 'liked')}>{currentLikes.length}</span>
      </p>
  }
  </>
)
}