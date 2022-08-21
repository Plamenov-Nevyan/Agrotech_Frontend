const alphanumericalRegex = /^[A-Za-z0-9 ()"']+$/
const descriptionRegex = /^[A-Za-z0-9 ,."/:-]+$/

export const isPriceValid = (price) => {
    let isNegative = price < 1
    let errors = []
    if(isNegative){errors.push('Price can\'t be lower than 1$!')}
    return errors
}

export const isQuantityValid = (quantity) => {
    let isNegative = quantity < 1
    let errors = []
    if(isNegative){errors.push('Quantity can\'t be lower than 1 item!')}
    return errors
}

export const isDosageValid = (dosage) => {
    let isRangeValid = dosage > 0 && dosage < 900
    let errors = []
    if(!isRangeValid){errors.push('Preparate dosage must be valid!')}
    return errors
}

export const isNameValid = (name) => {
    let isValid = alphanumericalRegex.test(name)
    let isTooShort = name.length < 5
    let errors = []
    if(!isValid){errors.push('Name must consist of alphanumerical characters only!')}
    if(isTooShort){errors.push('Name should be at least 5 characters long!')}
    return errors
}

export const isProducedByValid = (producedBy) => {
    let isValid = alphanumericalRegex.test(producedBy)
    let errors = []
    if(!isValid){errors.push('Company name must consist of alphanumerical characters only!')}
    return errors
}

export const isDescriptionValid = (description) => {
    let isValid = descriptionRegex.test(description)
    let isTooLong = description.length > 200
    let isTooShort = description.length < 20
    let errors = []
    if(!isValid){errors.push('Description must consist of valid characters only(letters,digits,intervals and ,."/)')}
    if(isTooLong){errors.push('Description should be maximum 200 characters long!')}
    if(isTooShort){errors.push('Description should be at least 20 characters long!')}
    return errors
}

export const isModelValid = (model) => {
    let isValid = alphanumericalRegex.test(model)
    let isTooShort = model.length < 2
    let errors = []
    if(!isValid){errors.push('Vehicle model must consist of alphanumerical characters only!')}
    if(isTooShort){errors.push('Vehicle model should be at least 2 characters long!')}
    return errors
}

export const isBrandValid = (brand) => {
    let isValid = alphanumericalRegex.test(brand)
    let isTooShort = brand.length < 2
    let errors = []
    if(!isValid){errors.push('Vehicle brand must consist of alphanumerical characters only!')}
    if(isTooShort){errors.push('Vehicle brand should be at least 2 characters long!')}
    return errors
}

export const areHorsePowersValid = (horsePowers) => {
    let isNegative = horsePowers < 1
    let errors = []
    if(isNegative){errors.push('Vehicle horse powers can\'t be in the negative!')}
    return errors
}

export const areKilometersValid = (kilometers) => {
    let isNegative = kilometers < 1
    let errors = []
    if(isNegative){errors.push('Vehicle kilometers can\'t be in the negative!')}
    return errors
}