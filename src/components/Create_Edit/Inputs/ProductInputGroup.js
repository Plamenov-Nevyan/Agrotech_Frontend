import { NameInput } from "./CommonInputs/NameInput"
import { PriceInput } from "./CommonInputs/PriceInput"
import { QuantityInput } from "./CommonInputs/QuantityInput"
import { DescriptionInput } from "./CommonInputs/DescriptionInput"
import { UploadInput } from "./CommonInputs/UploadInput"
import { ProductTypeSelect } from "./ProductInputs/ProductTypeSelect"
import {DosageInput} from "./ProductInputs/DosageInput"
import {ProducedByInput} from "./ProductInputs/ProducedByInput"

export const ProductInputGroup = ({inputValues, onChangeHandler}) => {
    return(
        <>
        <ProductTypeSelect value={inputValues.productType} onChangeHandler={(e) => onChangeHandler(e)} />
        < NameInput value={inputValues.name} onChangeHandler={(e) => onChangeHandler(e)}/>
        <PriceInput value={inputValues.price} onChangeHandler={(e) => onChangeHandler(e)}/>
        <QuantityInput value={inputValues.quantity} onChangeHandler={(e) => onChangeHandler(e)}/>
        <DosageInput value={inputValues.dosage} onChangeHandler={(e) => onChangeHandler(e)}/>
        <ProducedByInput value={inputValues.producedBy} onChangeHandler={(e) => onChangeHandler(e)}/>
        <DescriptionInput value={inputValues.description} onChangeHandler={(e) => onChangeHandler(e)}/>
        <UploadInput value={inputValues.upload} image={inputValues.imageToRender} onChangeHandler={(e) => onChangeHandler(e)}/>
        </>
    )
}