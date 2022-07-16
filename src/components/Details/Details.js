import { useParams} from "react-router-dom"
import { useEffect, useState } from "react"
import styles from "./css/details.module.css"
import {getDetails} from "../../services/publicationServices"
import {getSession} from "../../utils/getUserSession"
import { Comment } from "./Comment"
import { CommentForm } from "./CommentForm"
import { ImageWrapper } from "./ImageWrapper"
import { InfoWrapper } from "./InfoWrapper"
import { SubHeader } from "../SubHeader/SubHeader"

export const Details = () => {
    const [publicationDetails, setPublicationDetails] = useState({})
    const [commentInput, setCommentInput] = useState('')
    const {publicationId} = useParams()

   useEffect(() => {
    const loadDetails = async () => {
        let data = await getDetails(publicationId)
        setPublicationDetails(data)
    }
    loadDetails()
   }, [])


 const onChangeHandler = (e) => setCommentInput(e.target.value)
   
let userData = getSession()

    return(<>
         <SubHeader />
         {Object.values(publicationDetails).length > 0
        ? <> 
        <div className={styles.wrapper}>
            <ImageWrapper publDetails={publicationDetails} userData={userData}/>
            <InfoWrapper publDetails={publicationDetails} userData={userData}/>
        </div>
        <h1 className ={styles.comments_title}>Comments</h1>
        {publicationDetails.comments.length > 0
        ? <Comment comments={publicationDetails.comments}/>
        : <h1>No comments yet...</h1>
        }
         <div className={styles.add_comment_wrapper}>
           {userData
            ? <CommentForm value={commentInput} onChangeHandler={onChangeHandler}/>
            : <h3>Login or Sign up to post comments.</h3>
           }
        </div>
        </>
        : <h1>Loading...</h1>
    }
</>
)
}