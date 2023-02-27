import { useEffect, useState, useContext} from "react"
import { Link, useParams, useLocation} from "react-router-dom"
import styles from "./css/details.module.css"
import modalStyles from "./css/usersModal.module.css"
import {getDetails} from "../../services/publicationServices"
import {authContext} from "../../contexts/authContext"
import { CommentForm } from "./Comments/CommentForm"
import { ImageWrapper } from "./ImageWrapper"
import { InfoWrapper } from "./InfoWrapper"
import { SubHeader } from "../SubHeader/SubHeader"
import { UserListModal } from "./UserListModal/UserListModal"
import { UsersLikedOrFollowed } from "./UsersLiked"
import { SmallLoadingSpinner } from "../SmallLoadingSpinner/SmallLoadingSpinner"
import { SuccessAlert } from "../Alerts/Success"
import { ErrorAlert } from "../Alerts/Error";
import {UserProfileModal} from "../Profile/UserProfile/UserProfileModal"

export const Details = () => {
    const [showSuccessAlert, setShowSuccessAlert] = useState('')
    // Set state for the publication details info
    const [publicationDetails, setPublicationDetails] = useState({})
    // Set state about showing the modal for users who liked or followed this publication
    const [showModalData, setShowModal] = useState({
        // Don't show modal by default
        showModal:false, 
        // Users data
        data: [],
        // Identicator to search for users who liked or followed 
        likedOrFollowed: ''
    })
    const [showUserProfModal, setShowUserProfModal] = useState({
        show : false,
        userId : ''
    })
    const onCloseUserProfModal = () => setShowUserProfModal(oldData => {return {...oldData, show:false}})
    const openUserProfModal = (data) => setShowUserProfModal({...data})
    
    const [errors, setErrors] = useState([])
    const errorsSetter = (err) => {
      window.scrollTo({top: 0, behavior: 'smooth'});
      setErrors([...errors, err])
    }
    const successMessageSetter = (message) => {
        window.scrollTo({top: 0, behavior: 'smooth'});
        setShowSuccessAlert(message)
    }
    const {publicationId} = useParams()
    const location = useLocation()

    useEffect(() => {
        //  get the confirmation for showing success alert when redirecting from edit component, using useLocation hook 
       if(location.state !== null && location.state.showSuccessAlert){
        setShowSuccessAlert(`Publication edited successfully, all users following were notified!`)
       }
       }, [location])

   useEffect(() => {
    // Get the details info on component mount
    const loadDetails = async () => {
        try{
        let data = await getDetails(publicationId)
        setPublicationDetails(data)
        }catch(err){
        errorsSetter(err.message)
        }
    }
    loadDetails()
   }, [])

   // callback to close the modal when clicked on "X" button, or on the overlay     
   const onCloseHandler = () => setShowModal({showModal:false, data:[], likedOrFollowed : ''}) 

   const onModalClickHandler = (data, likedOrFollowed) => showModalData.showModal 
   ? setShowModal({showModal:false, data:[], likedOrFollowed : ''}) 
   : setShowModal({showModal:true, data, likedOrFollowed}) 
   
   let {_,authData} = useContext(authContext)
   
   let areDetailsLoaded = Object.values(publicationDetails).length > 0
   let isUserLogged = authData !== null

    return(
    <>
     {errors.length > 0 && <ErrorAlert errors={errors} />}
    {showSuccessAlert && <SuccessAlert message={showSuccessAlert}/>}
    {showUserProfModal.show && <UserProfileModal 
     userData={authData} 
     ownerId={showUserProfModal.userId} 
     onCloseModalHandler={onCloseUserProfModal} 
     errorsSetter={errorsSetter}
     successMessageSetter={successMessageSetter}
    />
    }
    {showModalData.showModal && 
    <UserListModal 
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
         {areDetailsLoaded
            ? <> 
                <div className={styles.wrapper}>
                    <ImageWrapper 
                    publDetails={publicationDetails} 
                    userData={authData} 
                    onModalClickHandler={onModalClickHandler} 
                    errorsSetter={errorsSetter}
                    successMessageSetter={successMessageSetter}
                    openUserProfModal={openUserProfModal}
                    />
                    <InfoWrapper 
                    publDetails={publicationDetails} 
                    userData={authData} 
                    errorsSetter={errorsSetter} 
                    successMessageSetter={successMessageSetter}
                    />
                </div>
                <h1 className ={styles.comments_title}>Comments</h1>
                <div className={styles.add_comment_wrapper}>
                {isUserLogged
                    ? <CommentForm 
                    userData={authData} 
                    publicationId={publicationDetails._id} 
                    owner={publicationDetails.owner}
                    errorsSetter={errorsSetter}
                    successMessageSetter={successMessageSetter}
                    openUserProfModal={openUserProfModal}
                    />
                    : <h3 className={styles.sign_up_header}><Link to={'/login'}>Login or Sign Up</Link> to post comments.</h3>
                }
                </div>
            </>
            : <SmallLoadingSpinner />
    }
</>
)
}