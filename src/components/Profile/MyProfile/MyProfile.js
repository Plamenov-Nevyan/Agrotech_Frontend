import { useState, useEffect } from "react"
import styles from "./css/myProfile.module.css"
import { getUserProfile } from "../../../services/profileServices"
import { getSession } from "../../../utils/getUserSession"
import {Header} from "./Header"
import { LeftPart } from "./LeftPart"
import { RightPart } from "./RightPart"
import { PersonalizationModal } from "./PersonalizationModal"

export const MyProfile = () => {
    const [userData, setUserData] = useState({})
    const [showModal, setShowModal] = useState(false)

    let userSession = getSession()
    useEffect(() => {
       getUserProfile(userSession._id)
       .then((userInfo) => setUserData(userInfo))
       .catch((err) => console.log(err))
    }, [])

  const showModalHandler = () => setShowModal(!showModal)
  const onCloseModalHandler = () => setShowModal(false)

    return(
        <div className={styles.container}>
    {showModal && <PersonalizationModal onCloseModalHandler={onCloseModalHandler} userData={userData}/>}
   <Header coverImage={userData ? userData.coverImage : undefined} showModalHandler={showModalHandler}/>
  <main className={styles.prof_main}>
    <div className={styles.row}>
      {Object.values(userData).length > 0
         ? <>
           <LeftPart profileInfo={userData}/>
           <RightPart profileInfo={userData}/>
         </>
         : <h1>Loading...</h1>
      }
      
    </div>
  </main>
</div>
    )
}