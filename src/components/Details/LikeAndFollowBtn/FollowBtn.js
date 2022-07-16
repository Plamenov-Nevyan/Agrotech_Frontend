import {useState} from "react"
import styles from "../css/details.module.css"
import {likeOrFollow} from "../../../services/publicationServices"

export const FollowBtn = ({follows, publicationId, userData}) => {
    const [currentFollows, setCurrentFollows] = useState(follows)

    const onFollowHandler = () => {
        likeOrFollow(publicationId, 'follow')
        .then(newFollows => setCurrentFollows(newFollows))
        .catch(err => console.log(err))
    }

    return (
    <>   
     {userData
       ? currentFollows.some((user) => user._id === userData._id)
           ?  <p className={styles.followings}>
               <i class="fa-solid fa-bookmark" aria-hidden="true"></i> : {currentFollows.length}
             </p>
           : <p className={styles.followings} onClick={onFollowHandler}>
               <i class="fa-solid fa-bookmark" aria-hidden="true"></i> : {currentFollows.length}
             </p>
     : <p className={styles.followings}>
   <i class="fa-solid fa-bookmark" aria-hidden="true"></i> : {currentFollows.length}
   </p>
     }
</>
    )
}