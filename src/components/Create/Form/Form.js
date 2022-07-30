import { useEffect, useState} from "react"
import {useNavigate} from 'react-router-dom'
import styles from "../css/form.module.css"
import {createPublication} from "../../../services/publicationServices"
import {setInputsForState} from "../../../utils/setInputs"
import { checkForErrors } from "../../../utils/validateCreateData"
import { NameInput } from "./Inputs/CommonInputs/NameInput"
import { PriceInput } from "./Inputs/CommonInputs/PriceInput"
import { QuantityInput } from "./Inputs/CommonInputs/QuantityInput"
import { DescriptionInput } from "./Inputs/CommonInputs/DescriptionInput"
import { UploadInput } from "./Inputs/CommonInputs/UploadInput"
import {TypeSelect} from "./Inputs/CommonInputs/TypeSelect"
import { ProductTypeSelect } from "./Inputs/ProductInputs/ProductTypeSelect"
import {VehicleModelInput} from "./Inputs/CommonInputs/VehicleModelInput"
import { VehicleBrandInput } from "./Inputs/CommonInputs/VehicleBrandInput"
import { VehicleDateInput } from "./Inputs/CommonInputs/VehicleYearInput"
import { VehicleHorsePowers } from "./Inputs/VehicleInputs/HorsePowersInput"
import { VehicleKilometers } from "./Inputs/VehicleInputs/KmInput"
import { InventoryTypeSelect } from "./Inputs/InventoryInputs/InventoryTypeSelect"
import { ServiceTypeSelect } from "./Inputs/ServicesInputs/SeviceTypeSelect"
import { AvailableInput } from "./Inputs/ServicesInputs/AvailableInput"
import {DosageInput} from "./Inputs/ProductInputs/DosageInput"
import {ProducedByInput} from "./Inputs/ProductInputs/ProducedByInput"
import { ErrorAlert } from "../../Alerts/Error"

export const Form = () => {
    const [type, setType] = useState('product')
    const [inputValues, setInputValues] = useState({}) 
    const [errors, setErrors] = useState([]) 
    let navigate = useNavigate()

    useEffect(() => {
      setInputValues(setInputsForState(type))
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

        createPublication(publicationData)
        .then(() => navigate('/catalogue') )
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
      {type === 'product' && 
      <>
        <ProductTypeSelect value={inputValues.productType} onChangeHandler={onChangeHandler} />
        < NameInput value={inputValues.name} onChangeHandler={onChangeHandler}/>
        <PriceInput value={inputValues.price} onChangeHandler={onChangeHandler}/>
        <QuantityInput value={inputValues.quantity} onChangeHandler={onChangeHandler}/>
        <DosageInput value={inputValues.dosage} onChangeHandler={onChangeHandler}/>
        <ProducedByInput value={inputValues.producedBy} onChangeHandler={onChangeHandler}/>
        <DescriptionInput value={inputValues.description} onChangeHandler={onChangeHandler}/>
        <UploadInput value={inputValues.upload} onChangeHandler={onChangeHandler}/>
        </>
      }
      {type === 'vehicle' &&
      <>
      <PriceInput value={inputValues.price} onChangeHandler={onChangeHandler}/>
       <VehicleModelInput value={inputValues.model} onChangeHandler={onChangeHandler}/>
       <VehicleBrandInput value={inputValues.brand} onChangeHandler={onChangeHandler}/>
       <VehicleDateInput value={inputValues.date} onChangeHandler={onChangeHandler}/>
       <VehicleHorsePowers value={inputValues.horsePowers} onChangeHandler={onChangeHandler}/>
       <VehicleKilometers value={inputValues.kilometers} onChangeHandler={onChangeHandler}/>
       <DescriptionInput value={inputValues.description} onChangeHandler={onChangeHandler}/>
       <UploadInput value={inputValues.upload} onChangeHandler={onChangeHandler}/>
      </>
      }
      {type === 'inventory' && 
      <>
      <InventoryTypeSelect value={inputValues.inventoryType} onChangeHandler={onChangeHandler}/>
      <PriceInput value={inputValues.price} onChangeHandler={onChangeHandler}/>
      <VehicleModelInput value={inputValues.model} onChangeHandler={onChangeHandler}/>
       <VehicleBrandInput value={inputValues.brand} onChangeHandler={onChangeHandler}/>
       <VehicleDateInput value={inputValues.date} onChangeHandler={onChangeHandler}/>
       <DescriptionInput value={inputValues.description} onChangeHandler={onChangeHandler}/>
       <UploadInput value={inputValues.upload} onChangeHandler={onChangeHandler}/>
      </>
      }
      {type === 'service' &&
       <>
          <ServiceTypeSelect value={inputValues.serviceType} onChangeHandler={onChangeHandler}/>
          <PriceInput value={inputValues.price} onChangeHandler={onChangeHandler}/>
          <AvailableInput value={inputValues.availableUntil} onChangeHandler={onChangeHandler}/>
          <DescriptionInput value={inputValues.description} onChangeHandler={onChangeHandler}/>
          <UploadInput value={inputValues.upload} onChangeHandler={onChangeHandler}/>
       </>
      }
      {type === 'other' &&
      <>
       < NameInput value={inputValues.name} onChangeHandler={onChangeHandler}/>
        <PriceInput value={inputValues.price} onChangeHandler={onChangeHandler}/>
        <QuantityInput value={inputValues.quantity} onChangeHandler={onChangeHandler}/>
        <DescriptionInput value={inputValues.description} onChangeHandler={onChangeHandler}/>
        <UploadInput value={inputValues.upload} onChangeHandler={onChangeHandler}/>
      </>
      }
        <button id={styles.submit_btn}>Submit</button>
    </div>
  </form>
</>
   )
}