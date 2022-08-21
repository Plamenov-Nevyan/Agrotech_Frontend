import styles from "./css/usersModal.module.css"
import {Link} from "react-router-dom"

export const UsersLikedOrFollowed = ({image, username, _id}) => {
   return(
    <div className={styles['user_who-liked']}>
        <img src={image} />
        <Link to={`/profile/${_id}`}><h5>{username}</h5></Link>
    </div>
   )
}