import { PriceInput } from "./CommonInputs/PriceInput"
import { DescriptionInput } from "./CommonInputs/DescriptionInput"
import { UploadInput } from "./CommonInputs/UploadInput"
import { ServiceTypeSelect } from "./ServicesInputs/SeviceTypeSelect"
import { AvailableInput } from "./ServicesInputs/AvailableInput"


export const ServiceInputGroup = ({inputValues, onChangeHandler}) => {
    return(
        <>
        <ServiceTypeSelect value={inputValues.serviceType} onChangeHandler={(e) => onChangeHandler(e)}/>
          <PriceInput value={inputValues.price} onChangeHandler={(e) => onChangeHandler(e)}/>
          <AvailableInput value={inputValues.availableUntil} onChangeHandler={(e) => onChangeHandler(e)}/>
          <DescriptionInput value={inputValues.description} onChangeHandler={(e) => onChangeHandler(e)}/>
          <UploadInput value={inputValues.upload} image={inputValues.imageToRender} onChangeHandler={(e) => onChangeHandler(e)}/>
        </>
    )
}