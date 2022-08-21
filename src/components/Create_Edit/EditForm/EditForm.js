import { useEffect, useState, useContext} from "react"
import {Link, useNavigate, useParams} from 'react-router-dom'
import { authContext } from "../../../contexts/authContext"
import styles from "../css/form.module.css"
import {setInputsForState} from "../../../utils/setInputs"
import { checkForErrors } from "../../../utils/validateCreateData"
import { getDetails, editPublication} from "../../../services/publicationServices"
import { sendNotification } from "../../../services/notificationServices"
import {TypeSelect} from "../Inputs/CommonInputs/TypeSelect"
import { ErrorAlert } from "../../Alerts/Error"
import { ProductInputGroup } from "../Inputs/ProductInputGroup"
import { VehicleInputGroup } from "../Inputs/VehicleInputGroup"
import { InventoryInputGroup } from "../Inputs/InventoryInputGroup"
import { ServiceInputGroup } from "../Inputs/ServiceInputGroup"
import {OtherInputGroup} from "../Inputs/OtherInputGroup"

export const EditForm = () => {
    const [type, setType] = useState('')
    const [publicationDetails, setPublicationDetails] = useState({})
    const [inputValues, setInputValues] = useState({}) 
    const [errors, setErrors] = useState([]) 
    const {_, authData, __} = useContext(authContext)
    let navigate = useNavigate()
    const {publicationId} = useParams()

    useEffect(() => {
      // Get details about the publication, that the user wants to edit, and set the corresponding state
       getDetails(publicationId)
       .then(publicationDetails => {
        setType(publicationDetails.publicationType)
        setInputValues(setInputsForState('edit', ``, publicationDetails))
        setPublicationDetails(state => {return{...publicationDetails}})
       })
    }, [])

    useEffect(() => {
      // Set filled inputs if the publication type corresponds with the one in the current publication details
      if(type === publicationDetails.publicationType){
        setInputValues(setInputsForState('edit', ``, publicationDetails))
      }
      // Set empty inputs if publication type chosen is different than in the current publication details
     else {
      setInputValues(setInputsForState('create', type))
     }
    }, [type])

    const onChangeHandler = (e) => {
      setInputValues(oldValues => {
        return{
          ...oldValues,
          [e.target.name]: e.target.files ? e.target.files[0] : e.target.value
        }
      })
    }

    const onSubmitHandler = (e, publicationData) => {
      e.preventDefault()
      let errors = checkForErrors(publicationData)
      let isThereEmptyField = Object.values(publicationData).includes('')
      let areThereErrorsInFormData = errors.length > 0
      
      if(isThereEmptyField){
        window.scrollTo({top: 0, behavior: 'smooth'})
        return setErrors(['Please fill the required information!'])
      }
      else if(areThereErrorsInFormData){
        window.scrollTo({top: 0, behavior: 'smooth'})
        return setErrors(errors)
      }
      else{setErrors([])}

      // Send PUT request to the backend, that will update the publication
      editPublication({
        ...publicationData, 
        followedBy : publicationDetails.followedBy, 
        owner :publicationDetails.owner
      }, 
        publicationDetails._id,
        authData.accessToken
        )
      .then(async() =>{ 
        // Send notifications to all users who follow this publication, that it was edited
        let notificationsToSend = []
        for(let follower in publicationDetails.followedBy){
      
          let notificationData = { 
            type : 'edit', 
            receiver : publicationDetails.followedBy[follower]._id, 
            sender : publicationDetails.owner._id, 
            forPublication : publicationId,
            read : false
          }
          notificationsToSend.push(notificationData)
        }
        notificationsToSend.length > 0 && await sendNotification(notificationsToSend)
        // Redirect to the publication details page
        navigate(`/catalogue/details/${publicationDetails._id}`, {state:{showSuccessAlert:true}})
      })
      .catch(err => setErrors([err.message]))
}

  const onSelectTypeHandler = (e) => {
     setType(e.target.value)
  }

  let areThereErrors = errors.length > 0

    return (
    <>
        {areThereErrors > 0 && <ErrorAlert errors={errors} />}
        <form 
        className={styles.form} 
        encType="multipart/form-data" 
        onSubmit={(e) =>
         onSubmitHandler(e, inputValues)}
         >

        <div id={styles.formContent}>
          <h1 className={styles.active}>Edit your publication</h1>
        </div>

        <div className={styles.input_wrapper}>
        <TypeSelect value={type} onSelectTypeHandler={onSelectTypeHandler}/>
          {type === 'product' && <ProductInputGroup inputValues={inputValues} onChangeHandler={onChangeHandler} />}
          {type === 'vehicle' && <VehicleInputGroup inputValues={inputValues} onChangeHandler={onChangeHandler} />}
          {type === 'inventory' && <InventoryInputGroup inputValues={inputValues} onChangeHandler={onChangeHandler} />}
          {type === 'service' && <ServiceInputGroup inputValues={inputValues} onChangeHandler={onChangeHandler} /> }
          {type === 'other' && <OtherInputGroup inputValues={inputValues} onChangeHandler={onChangeHandler} /> }
            <div className={styles.form_btns_holder}>
              <button id={styles.submit_btn}>Edit</button>
              <Link className={styles.cancel_edit_btn} to={`/catalogue/details/${publicationId}`}>Cancel</Link>
            </div>
        </div>

      </form>
    </>
    )
}