import {useState} from "react"
import styles from "../css/details.module.css"
import {likeOrFollow} from "../../../services/publicationServices"

export const LikeBtn = ({likes, publicationId, userData}) => {
    const [currentLikes, setCurrentLikes] = useState(likes)
 console.log(currentLikes)
    const onLikeHandler = () => {
      likeOrFollow(publicationId, 'like')
      .then(newLikes => setCurrentLikes(newLikes))
      .catch(err => console.log(err))
    }

    return (
     <>   
    {userData
     ? currentLikes.some((user) => user._id === userData._id)
          ? <p className={styles.likes}>
            <i className="fa fa-thumbs-up" aria-hidden="true" /> : {currentLikes.length}
            </p>
          : <p className={styles.likes} onClick={onLikeHandler}>
            <i className="fa fa-thumbs-up" aria-hidden="true" /> : {currentLikes.length}
            </p>
    : <p className={styles.likes}>
    <i className="fa fa-thumbs-up" aria-hidden="true" /> : {currentLikes.length}
  </p>
  }
  </>
)
}