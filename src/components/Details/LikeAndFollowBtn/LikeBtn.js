import {useState} from "react"
import { sendNotification } from "../../../services/notificationServices"
import styles from "../css/details.module.css"
import {likeOrFollow} from "../../../services/publicationServices"


export const LikeBtn = ({likes, publicationId,userData, ownerId, onModalClickHandler}) => {
    const [currentLikes, setCurrentLikes] = useState(likes)

    const onLikeHandler = () => {
      likeOrFollow(publicationId, 'like')
      .then(async (newLikes) => {
        await sendNotification({ 
          type : 'like', 
          receiver : ownerId, 
          sender : userData._id, 
          forPublication : publicationId,
          read : false
        })
        setCurrentLikes(newLikes)
      })
      .catch(err => console.log(err))
    }

    let isUserSignedIn = userData
    let isOwner = isUserSignedIn ? userData._id === ownerId : false
    let isLikedAlready = isUserSignedIn ? currentLikes.some((user) => user._id === userData._id) : false
console.log(isLikedAlready)
    return (
     <>   
  {isUserSignedIn
    ? isOwner
        ? <p className={styles.likes}> 
             <i className="fa fa-thumbs-up" aria-hidden="true" /> : <span onClick={() => onModalClickHandler(currentLikes, 'liked')}>{currentLikes.length}</span>
          </p>
        :  isLikedAlready
            ? <p className={styles.likes}>
                  <i className="fa fa-thumbs-up" aria-hidden="true" /> :<span onClick={() => onModalClickHandler(currentLikes, 'liked')}>{currentLikes.length}</span>
              </p>
            : <p className={styles.likes} onClick={onLikeHandler}>  
                  <i className="fa fa-thumbs-up" aria-hidden="true" /> :<span onClick={() => onModalClickHandler(currentLikes, 'liked')}>{currentLikes.length}</span>  
              </p>
    : <p className={styles.likes}>
          <i className="fa fa-thumbs-up" aria-hidden="true" /> :<span onClick={() => onModalClickHandler(currentLikes, 'liked')}>{currentLikes.length}</span>
        </p>
  }
  </>
)
}