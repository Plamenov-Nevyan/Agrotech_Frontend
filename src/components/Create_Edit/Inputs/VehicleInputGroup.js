import { PriceInput } from "./CommonInputs/PriceInput"
import { DescriptionInput } from "./CommonInputs/DescriptionInput"
import { UploadInput } from "./CommonInputs/UploadInput"
import {VehicleModelInput} from "./CommonInputs/VehicleModelInput"
import { VehicleBrandInput } from "./CommonInputs/VehicleBrandInput"
import { VehicleDateInput } from "./CommonInputs/VehicleYearInput"
import { VehicleHorsePowers } from "./VehicleInputs/HorsePowersInput"
import { VehicleKilometers } from "./VehicleInputs/KmInput"

export const VehicleInputGroup = ({inputValues, onChangeHandler}) => {
    return(
        <>
        <PriceInput value={inputValues.price} onChangeHandler={(e) => onChangeHandler(e)}/>
       <VehicleModelInput value={inputValues.model} onChangeHandler={(e) => onChangeHandler(e)}/>
       <VehicleBrandInput value={inputValues.brand} onChangeHandler={(e) => onChangeHandler(e)}/>
       <VehicleDateInput value={inputValues.date} onChangeHandler={(e) => onChangeHandler(e)}/>
       <VehicleHorsePowers value={inputValues.horsePowers} onChangeHandler={(e) => onChangeHandler(e)}/>
       <VehicleKilometers value={inputValues.kilometers} onChangeHandler={(e) => onChangeHandler(e)}/>
       <DescriptionInput value={inputValues.description} onChangeHandler={(e) => onChangeHandler(e)}/>
       <UploadInput value={inputValues.upload} image={inputValues.imageToRender} onChangeHandler={(e) => onChangeHandler(e)}/>
        </>
    )
}