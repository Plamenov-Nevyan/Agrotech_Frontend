import { useEffect, useState } from "react"
import styles from "../../css/form.module.css"

export const UploadInput = ({value, imageToRender, onChangeHandler}) => {
    const [imagePreview, setPreview] = useState(imageToRender)

    useEffect(() => {
        if(!value){
          return setPreview(null) 
        }
          const objectUrl = URL.createObjectURL(value)
          setPreview(objectUrl)
  
          return () => URL.revokeObjectURL(value)
      }, [value])

    return (
        <>
        <img className={styles.img_preview} src={imagePreview}/>
        <div className={styles.label_holder}>
             <label htmlFor="upload" className={styles.label}>Product image:</label>
        </div>
        <div className={styles.input_holder}>
            <input className={styles.uploadInput} type="file" name="upload" id="upload" onChange={(e) => onChangeHandler(e)}/>
        </div>
        </>
    )
}