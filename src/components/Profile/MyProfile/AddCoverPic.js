import { useState, useEffect } from "react"
import styles from "./css/addProfilePic.module.css"
import {addCoverPic} from "../../../services/profileServices"
import { SuccessAlert } from "../../Alerts/Success"

export const AddCoverPic = ({userData}) => {
    const [imageLinkValue, setImageLink] = useState('')
    const [fileValue, setFileValue] = useState(undefined)
    const [imagePreview, setPreview] = useState()
    const [imageSavedSucessfully, setImageSaved] = useState(false)

    useEffect(() => {
        if(!fileValue){
            return setPreview(null)
        }
        const objectUrl = URL.createObjectURL(fileValue)
        setPreview(objectUrl)
          return () => URL.revokeObjectURL(fileValue)
      }, [fileValue])
    
      const onUploadChange = (e) =>{ 
        setImageLink('')
        setFileValue(e.target.files[0])
    }
      const onLinkChange = (e) => { 
        setFileValue(undefined)
        setImageLink(e.target.value)
    }
      const onSubmit = (e) => {
         e.preventDefault()
         fileValue ? addCoverPic(userData, fileValue) : addCoverPic(userData, imageLinkValue)
         .then(() => setImageSaved(true))
         .catch(err => console.log(err))
      }

    return(
        <>
        {imageSavedSucessfully && <SuccessAlert message={'New cover picture added!'}/>}
        <img src={imagePreview
         ? imagePreview
         : imageLinkValue
            ? imageLinkValue
            : userData.coverImage
               ? userData.coverImage
               : `https://images.pexels.com/photos/1731427/pexels-photo-1731427.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260`
               
        }
        className={styles.pic_preview_cover}
        />
        <img src={userData.image
         ? userData.image
         : `https://drive.google.com/uc?export=view&id=1iMt8_whGlwVVfGofzNKVf7O9bwrNdjnt`
        }
        className = {styles.pic_user_image_for_cover}
        />
        <form className={styles.change_form} onSubmit={(e) => onSubmit(e, userData._id)} encType="multipart/form-data">
            <div>
                <label className={styles.change_label} htmlFor="fromLink">Paste a link</label>
                <input className={styles.change_input} defaultValue={imageLinkValue} type="text" id="fromLink" name="fromLink" onChange={(e) => onLinkChange(e)}/>
            </div>
            <div><p>Or</p></div>
            <div>
                <label className={styles.change_label} htmlFor="upload">Upload a file</label>
                <input className={styles.change_input} type="file" name="upload" id="upload" onChange={(e) => onUploadChange(e)} />
            </div>
            <button className={styles.submit_btn}>Save</button>
        </form>
        </>
    )
}