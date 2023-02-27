import { useState, useEffect } from "react"
import {addComment, getComments, getCommentsCount} from "../../../services/commentServices"
import { sendNotification } from "../../../services/notificationServices"
import styles from "../css/details.module.css"
import { constants } from "../../../config/constants"
import { Comment } from "./Comment"
import { Pager } from "./Pager"
import { CommentSort } from "./CommentSort"
import {SmallLoadingSpinner} from "../../SmallLoadingSpinner/SmallLoadingSpinner"

export const CommentForm = ({userData, publicationId, owner, errorsSetter, successMessageSetter, openUserProfModal}) => {
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
        .catch(err => errorsSetter(err.message))
      },[currentPage])
      

      const onCommentSubmit = (e) => {
        e.preventDefault()
        setCommentContent(oldContent => '')
        if(commentContent === ''){return errorsSetter('You can\'t post an empty comment!')}

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
           let notification = {
            sender : userData._id,
            receiver : owner._id,
            type : 'comment',
            forPublication : publicationId
           }
           await sendNotification(notification)
           successMessageSetter('Comment posted successfully!')
          }catch(err){
            throw err
          }
          })
          .catch(err => errorsSetter(err.message))
      }

    let sortedComments
    if(commentsData.comments){
      commentSortType === 'recent' 
      ? sortedComments = commentsData.comments.sort((a,b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
      : sortedComments = commentsData.comments.sort((a,b) => Date.parse(a.createdAt) - Date.parse(b.createdAt))
    }
  
    if(userData){
    return (
        <>
        { Object.values(commentsData).length > 0
            ? commentsData.comments.length > 0
                ?<> 
                <CommentSort onSortChangeHandler={onSortChangeHandler}/>
                <Comment comments={sortedComments} userId={userData._id} userImage={userData.image} openUserProfModal={openUserProfModal}/>
                < Pager 
                onPageChange={onPageChange} 
                totalPages={commentsData.pages} 
                currentPage={currentPage}
                />
                </>
                : <h1 className={styles.not_available_heading}>No comments yet...</h1>
            : <SmallLoadingSpinner />
          }
        <article className={styles.add_comment}>
            <form id={styles.comment_form} onSubmit={(e) => onCommentSubmit(e)}>
                <textarea
                    name="content"
                    id={styles.content}
                    placeholder="Type your comment..."
                    onChange={(e) => onChangeHandler(e)}
                >{commentContent}</textarea>
                <input id={styles.commentBtn} type="submit" value="Add comment" />
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
              :<SmallLoadingSpinner />
          }
        </>
    )
 }
}