import { useState } from "react"
import styles from "./css/details.module.css"
import { Comment } from "./Comment"

export const CommentForm = ({comments, userData}) => {
      const [currentComments, setCurrentComments] = useState(comments)

      const onCommentSumit = async () => {

      }

    //   TOD :  ADD BACKEND AND FRONTEND SERVICE !
    
    if(userData){
    return (
        <>
         {currentComments.length > 0
          ? <Comment comments={currentComments}/>
          : <h1>No comments yet...</h1>
          }
        <article className={styles.add_comment}>
            <form id={styles.comment_form}>
                <textarea
                    name="content"
                    id={styles.content}
                    placeholder="Type your comment..."
                />
                <input id={styles.commentBtn} type="submit" defaultValue="Add comment" />
            </form>
        </article>
      </>
    )
 }
 else{
    return(
        <>
          {currentComments.length > 0
          ? <Comment comments={currentComments}/>
          : <h1>No comments yet...</h1>
          }
        </>
    )
 }
}