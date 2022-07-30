import { useState, useEffect } from "react"
import {addComment, getComments, getCommentsCount} from "../../services/commentServices"
import styles from "./css/details.module.css"
import { constants } from "../../config/constants"
import { sortWhenAddComment } from "../../utils/sortWhenAddComment"
import { Comment } from "./Comment"
import { Pager } from "./Pager"
import { CommentSort } from "./CommentSort"

export const CommentForm = ({userData, publicationId}) => {
      const [currentPage, setCurrentPage] = useState(1)
      const [commentsData, setCommentsData] = useState({})
      const [commentContent, setCommentContent] = useState('')
      const [commentSortType, setCommentSortType] = useState('recent')

     

      const onChangeHandler = (e) => setCommentContent(e.target.value)
      const onSortChangeHandler = (e) => setCommentSortType(e.target.value)
   
      const onPageChange = (page) => {
          if(page > commentsData.pages || page < 1){return}
          else {setCurrentPage(page)}
      } 
  
      useEffect(() => {
        getComments(currentPage, publicationId, commentSortType)
        .then((commentsDataReceived) => setCommentsData(commentsDataReceived))
        .catch(err => console.log(err))
      },[currentPage])
      

      const onCommentSubmit = (e) => {
        e.preventDefault()
          addComment(publicationId, commentContent, userData._id, userData.accessToken)
          .then(async (newComment) => {
            try {
            let count = await getCommentsCount(publicationId)
            setCommentsData(oldCommentsData => {
              return {
                comments : commentSortType === 'recent' 
                ? [newComment, ...oldCommentsData.comments]
                : [...oldCommentsData.comments, newComment],
                pages: Math.ceil(count / constants.commentsPerPage)
              }
            })
          }catch(err){
            throw err
          }
          })
          .catch(err => console.log(err))
      }

    let sortedComments
    if(commentsData.comments){
      commentSortType === 'recent' 
      ? sortedComments = commentsData.comments.sort((a,b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
      : sortedComments = commentsData.comments.sort((a,b) => Date.parse(a.createdAt) - Date.parse(b.createdAt))
    }
    console.log(sortedComments)
    if(userData){
    return (
        <>
        { Object.values(commentsData).length > 0
            ? commentsData.comments.length > 0
                ?<> 
                <CommentSort onSortChangeHandler={onSortChangeHandler}/>
                <Comment comments={sortedComments}/>
                < Pager onPageChange={onPageChange} totalPages={commentsData.pages}/>
                </>
                : <h1>No comments yet...</h1>
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
           { Object.values(commentsData).length > 0
              ? commentsData.comments.length > 0
                ? <Comment comments={sortedComments}/>
                : <h1>No comments yet...</h1>
              :<h1>No comments yet...</h1>
          }
        </>
    )
 }
}