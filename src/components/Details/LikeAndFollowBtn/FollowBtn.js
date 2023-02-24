import {useState} from "react"
import styles from "../css/details.module.css"
import {likeOrFollow} from "../../../services/publicationServices"

export const FollowBtn = ({follows, publicationId, userData, ownerId, onModalClickHandler, errorsSetter, successMessageSetter}) => {
    const [currentFollows, setCurrentFollows] = useState(follows)

    const onFollowHandler = () => {
        likeOrFollow(publicationId, 'follow', userData)
        .then(newFollows => {
          setCurrentFollows(newFollows)
          successMessageSetter('Publication followed !')
        })
        .catch(err => errorsSetter(err.message))
    }

    return (
    <>   
     {userData
     ? userData._id !== ownerId
            ? currentFollows.some((user) => user._id === userData._id)
                ?  <p className={styles.followings}>
                   <i class="fa-solid fa-bookmark" aria-hidden="true"></i> : <span onClick={() => onModalClickHandler(currentFollows, 'followed')}>{currentFollows.length}</span>
                 </p>
               : <p className={styles.followings} onClick={onFollowHandler}>
                   <i class="fa-solid fa-bookmark" aria-hidden="true"></i> : <span onClick={() => onModalClickHandler(currentFollows, 'followed')}>{currentFollows.length}</span>
                 </p>
          : <p className={styles.followings}>
            <i class="fa-solid fa-bookmark" aria-hidden="true"></i> : <span onClick={() => onModalClickHandler(currentFollows, 'followed')}>{currentFollows.length}</span>
            </p>
    : <p className={styles.followings}>
        <i class="fa-solid fa-bookmark" aria-hidden="true"></i> : <span onClick={() => onModalClickHandler(currentFollows, 'followed')}>{currentFollows.length}</span>
     </p>
     }
</>
    )
}