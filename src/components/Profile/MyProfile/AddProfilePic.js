import { useState, useEffect } from "react"
import styles from "./css/addProfilePic.module.css"
import {addProfilePic} from "../../../services/profileServices"
import { SuccessAlert } from "../../Alerts/Success"

export const AddProfilePic = ({userData}) => {
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
    
      const onUploadChange = (e) => setFileValue(e.target.files[0])
      const onLinkChange = (e) =>  setImageLink(e.target.value)
      const onSubmit = (e, userId) => {
         e.preventDefault()
         fileValue ? addProfilePic(userData, fileValue) : addProfilePic(userData, imageLinkValue)
         .then(() => setImageSaved(true))
         .catch(err => console.log(err))
      }

    return(
        <>
        {imageSavedSucessfully && <SuccessAlert />}
        <img src={imagePreview
         ? imagePreview
         : imageLinkValue
            ? imageLinkValue
            : userData.image
               ? userData.image
               : `https://drive.google.com/uc?export=view&id=1iMt8_whGlwVVfGofzNKVf7O9bwrNdjnt`
        }
        className={styles.pic_preview}
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