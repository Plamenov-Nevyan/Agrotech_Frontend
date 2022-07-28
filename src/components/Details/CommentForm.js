import { useState } from "react"
import {addComment} from "../../services/publicationServices"
import styles from "./css/details.module.css"
import { Comment } from "./Comment"

export const CommentForm = ({comments, userData, publicationId}) => {
      const [currentComments, setCurrentComments] = useState(comments)
      const [commentContent, setCommentContent] = useState('')

      const onChangeHandler = (e) => setCommentContent(e.target.value)

      const onCommentSubmit = (e) => {
        e.preventDefault()
          addComment(publicationId, commentContent)
          .then(newComments => {
            console.log(newComments)
            setCurrentComments(newComments)
          })
          .catch(err => console.log(err))
      }
    
    if(userData){
    return (
        <>
         {currentComments.length > 0
          ? <Comment comments={currentComments}/>
          : <h1>No comments yet...</h1>
          }
        <article className={styles.add_comment}>
            <form id={styles.comment_form} onSubmit={(e) => onCommentSubmit(e)}>
                <textarea
                    name="content"
                    id={styles.content}
                    placeholder="Type your comment..."
                    onChange={(e) => onChangeHandler(e)}
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