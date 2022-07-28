import * as createValidators from "./createValidators"

export const checkForErrors = (publicationData) => {
    let errors = []
   if(publicationData.publicationType === 'product'){
      let nameErrors = createValidators.isNameValid(publicationData.name)
      let priceErrors = createValidators.isPriceValid(publicationData.price)
      let quantityErrors = createValidators.isQuantityValid(publicationData.quantity)
      let dosageErrors = createValidators.isDosageValid(publicationData.dosage)
      let producedByErrors = createValidators.isProducedByValid(publicationData.producedBy)
      let descriptionErrors = createValidators.isDescriptionValid(publicationData.description)
      errors = [...nameErrors,...priceErrors,...quantityErrors,...dosageErrors,...producedByErrors,...descriptionErrors]
   }
   else if(publicationData.publicationType === 'vehicle'){
       let modelErrors = createValidators.isModelValid(publicationData.model)
    let brandErrors = createValidators.isBrandValid(publicationData.brand)
    let priceErrors = createValidators.isPriceValid(publicationData.price)
    let horsePowErrors = createValidators.areHorsePowersValid(publicationData.horsePowers)
    let kilometersErrors = createValidators.areKilometersValid(publicationData.kilometers)
    let descriptionErrors = createValidators.isDescriptionValid(publicationData.description)
    errors = [...modelErrors,...brandErrors,...priceErrors,...horsePowErrors,...kilometersErrors,...descriptionErrors]
 }
 else if(publicationData.publicationType === 'inventory'){
    let modelErrors = createValidators.isModelValid(publicationData.model)
 let brandErrors = createValidators.isBrandValid(publicationData.brand)
 let priceErrors = createValidators.isPriceValid(publicationData.price)
 let descriptionErrors = createValidators.isDescriptionValid(publicationData.description)
 errors = [...modelErrors,...brandErrors,...priceErrors,...descriptionErrors]
}
else if(publicationData.publicationType === 'service'){
 let priceErrors = createValidators.isPriceValid(publicationData.price)
 let descriptionErrors = createValidators.isDescriptionValid(publicationData.description)
 errors = [...priceErrors,...descriptionErrors]
}
else if(publicationData.publicationType === 'other'){
    let nameErrors = createValidators.isNameValid(publicationData.name)
    let priceErrors = createValidators.isPriceValid(publicationData.price)
    let quantityErrors = createValidators.isQuantityValid(publicationData.quantity)
    let descriptionErrors = createValidators.isDescriptionValid(publicationData.description)
    errors = [...nameErrors,...priceErrors,...quantityErrors,...descriptionErrors]
   }

   return errors
}