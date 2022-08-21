import { Link } from "react-router-dom"
import styles from "../css/details.module.css"

export const Comment = ({ comments, userId, userImage }) => {

    return (
        <div className={styles.comments}>
            <ul className={styles.comments_list}>
                {comments.map(comment =>
        (
            <li className={styles.comment}>
            <span>{comment.createdAt.split('T')[0]}</span>
            <img src={userImage} className={styles.userImage}/>
            <Link to={`/profile/${comment.author._id}`}><header className={styles.comment_author}>{comment.author.username}</header></Link>
            <p className={styles.comment_content}>{comment.content}</p>
            </li> 
        ))}
            </ul>
        </div>
    )
}

