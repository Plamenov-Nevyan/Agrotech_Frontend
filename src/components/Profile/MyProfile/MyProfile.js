import { useState, useEffect, useContext } from "react"
import {authContext} from "../../../contexts/authContext"
import styles from "./css/myProfile.module.css"
import { getUserProfile } from "../../../services/profileServices"
import {Header} from "./Header"
import { LeftPart } from "./LeftPart"
import { RightPart } from "./RightPart"
import { PersonalizationModal } from "./PersonalizationModal"
import {SmallLoadingSpinner} from "../../SmallLoadingSpinner/SmallLoadingSpinner"
import {ErrorAlert} from "../../Alerts/Error"

export const MyProfile = () => {
    const {_, authData, __} = useContext(authContext)
    const [errors, setErrors] = useState([])
    const [profileData, setProfileData] = useState(null)
    const [showModal, setShowModal] = useState(false)

   let isProfileInfoLoaded = profileData !== null

  const showModalHandler = () => setShowModal(!showModal)
  const onCloseModalHandler = () => setShowModal(false)
  
useEffect(() => {
  getUserProfile(authData._id)
  .then((profile) => setProfileData(profile))
  .catch(err => setErrors(oldErrors => [...oldErrors, err]))
}, [])

    return(
        <div className={styles.container}>
    {showModal && 
    <PersonalizationModal 
    onCloseModalHandler={onCloseModalHandler} 
    userData={authData}
    />}
   <Header 
   coverImage={authData ? authData.coverImage : undefined} 
   showModalHandler={showModalHandler}
   />
  <main className={styles.prof_main}>
    <div className={styles.row}>
      {isProfileInfoLoaded
         ? <>
           <LeftPart profileInfo={profileData}/>
           <RightPart profileInfo={profileData}/>
          </>
         : <SmallLoadingSpinner />
      }
    </div>
  </main>
</div>
    )
}