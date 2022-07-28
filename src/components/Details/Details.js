import { useParams} from "react-router-dom"
import { useEffect, useState } from "react"
import styles from "./css/details.module.css"
import modalStyles from "./css/usersModal.module.css"
import {getDetails} from "../../services/publicationServices"
import {getSession} from "../../utils/getUserSession"
import { CommentForm } from "./CommentForm"
import { ImageWrapper } from "./ImageWrapper"
import { InfoWrapper } from "./InfoWrapper"
import { SubHeader } from "../SubHeader/SubHeader"
import { Modal } from "../Modal/Modal"
import { UsersLikedOrFollowed } from "./UsersLiked"

export const Details = () => {
    const [publicationDetails, setPublicationDetails] = useState({})
    const [showModalData, setShowModal] = useState({
        showModal:false, 
        data: [],
        likedOrFollowed: ''
    })
    const {publicationId} = useParams()

   useEffect(() => {
    const loadDetails = async () => {
        let data = await getDetails(publicationId)
        setPublicationDetails(data)
    }
    loadDetails()
   }, [])

   const onCloseHandler = () => setShowModal({showModal:false, data:[], likedOrFollowed : ''}) 

   const onModalClickHandler = (data, likedOrFollowed) => showModalData.showModal 
   ? setShowModal({showModal:false, data:[], likedOrFollowed : ''}) 
   : setShowModal({showModal:true, data, likedOrFollowed}) 
   
let userData = getSession()

    return(<>
    {showModalData.showModal && <Modal 
     content={
     <ul className={modalStyles.user_list_likes}>
        {showModalData.data.map(userWhoLikedOrFollowed => <li className={modalStyles.user_li_item}>
            <UsersLikedOrFollowed key={userWhoLikedOrFollowed._id} {...userWhoLikedOrFollowed} />
            </li>
            )}
      </ul>} 
     onCloseHandler={onCloseHandler}
     likeOrFollow={showModalData.likedOrFollowed}
     />
     }
         <SubHeader />
         {Object.values(publicationDetails).length > 0
        ? <> 
        <div className={styles.wrapper}>
            <ImageWrapper publDetails={publicationDetails} userData={userData} onModalClickHandler={onModalClickHandler}/>
            <InfoWrapper publDetails={publicationDetails} userData={userData}/>
        </div>
        <h1 className ={styles.comments_title}>Comments</h1>
         <div className={styles.add_comment_wrapper}>
           {userData
            ? <CommentForm comments={publicationDetails.comments} userData={userData} publicationId={publicationDetails._id} />
            : <h3>Login or Sign up to post comments.</h3>
           }
        </div>
        </>
        : <h1>Loading...</h1>
    }
</>
)
}