
export const setInputsForState = (publicationType) => {
   if(publicationType === 'product'){
    return {
        publicationType,
        name: '',
        price: '',
        quantity: '',
        description: '',
        dosage: '',
        producedBy: '',
        productType: 'insecticide',
        upload: undefined
    }
}
else if(publicationType ===  'vehicle'){
    return {
            publicationType,
            model : '',
            brand: '',
            date: '',   
            price: '',
            description: '',
            horsePowers: '',
            kilometers: '',
            upload: undefined
        }
    }
else if(publicationType === 'service'){
    return {
        publicationType,
        serviceType: '',
        availableUntil: '',
        price: '',
        description: '',
        upload: undefined
    }
}
else if(publicationType === 'inventory'){
    return {
        publicationType,
        inventoryType: '',
        model: '',
        brand: '',
        date: '',
        price: '',
        description : '',
        upload: undefined
    }
}
else if(publicationType === 'other'){
    return {
        publicationType,
        name: '',
        price: '',
        quantity: '',
        description: '',
        upload: undefined
    }
}
}