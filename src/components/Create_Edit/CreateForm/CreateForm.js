import { useEffect, useState, useContext} from "react"
import { authContext } from "../../../contexts/authContext"
import {useNavigate} from 'react-router-dom'
import styles from "../css/form.module.css"
import {createPublication} from "../../../services/publicationServices"
import {setInputsForState} from "../../../utils/setInputs"
import { checkForErrors } from "../../../utils/validateCreateData"
import {TypeSelect} from "../Inputs/CommonInputs/TypeSelect"
import { ErrorAlert } from "../../Alerts/Error"
import { ProductInputGroup } from "../Inputs/ProductInputGroup"
import { VehicleInputGroup } from "../Inputs/VehicleInputGroup"
import { InventoryInputGroup } from "../Inputs/InventoryInputGroup"
import { ServiceInputGroup } from "../Inputs/ServiceInputGroup"
import {OtherInputGroup} from "../Inputs/OtherInputGroup"

export const CreateForm = () => {
    const [type, setType] = useState('product')
    const [inputValues, setInputValues] = useState({}) 
    const [errors, setErrors] = useState([]) 
    const {_, authData, __} = useContext(authContext)
    let navigate = useNavigate()


    useEffect(() => {
      setInputValues(setInputsForState('create', type))
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
        
        if(Object.values(publicationData).includes('')){
          window.scrollTo({top: 0, behavior: 'smooth'})
          return setErrors(['Please fill the required information!'])
        }
        else if(errors.length > 0){
          window.scrollTo({top: 0, behavior: 'smooth'})
          return setErrors(errors)
        }
        else{setErrors([])}

        createPublication(publicationData, authData)
        .then(() => navigate('/catalogue', {state:{showSuccessAlert:true}}))
        .catch(err => setErrors([err.message]))
}

    const onSelectTypeHandler = (e) => {
       setType(e.target.value)
    }

    return(
<>
{errors.length > 0 && <ErrorAlert errors={errors} />}
    <form className={styles.form} encType="multipart/form-data" onSubmit={(e) => onSubmitHandler(e, inputValues)}>
    <div id={styles.formContent}>
      <h1 className={styles.active}>Create a new publication, and post it on the market!</h1>
    </div>
    <div className={styles.input_wrapper}>
    <TypeSelect value={type} onSelectTypeHandler={onSelectTypeHandler}/>
      {type === 'product' && <ProductInputGroup inputValues={inputValues} onChangeHandler={onChangeHandler} />}
      {type === 'vehicle' && <VehicleInputGroup inputValues={inputValues} onChangeHandler={onChangeHandler} />}
      {type === 'inventory' && <InventoryInputGroup inputValues={inputValues} onChangeHandler={onChangeHandler} />}
      {type === 'service' && <ServiceInputGroup inputValues={inputValues} onChangeHandler={onChangeHandler} /> }
      {type === 'other' && <OtherInputGroup inputValues={inputValues} onChangeHandler={onChangeHandler} /> }
        <button id={styles.submit_btn}>Submit</button>
    </div>
  </form>
</>
   )
}