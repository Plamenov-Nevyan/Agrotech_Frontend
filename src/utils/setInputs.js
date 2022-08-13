const handlers = {
    create : (publicationType) => {
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
                serviceType: 'Field Work',
                availableUntil: '',
                price: '',
                description: '',
                upload: undefined
            }
        }
        else if(publicationType === 'inventory'){
            return {
                publicationType,
                inventoryType: 'Plough',
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
    },
 edit : (publicationData) => {
    if(publicationData.publicationType === 'product'){
        return {
            publicationType : publicationData.publicationType,
            name: publicationData.name,
            price: publicationData.price,
            quantity: publicationData.quantity,
            description: publicationData.description,
            dosage: publicationData.dosage,
            producedBy: publicationData.producedBy,
            productType: publicationData.productType,
            upload: undefined
        }
    }
    else if(publicationData.publicationType ===  'vehicle'){
        return {
                publicationType : publicationData.publicationType,
                model : publicationData.model,
                brand: publicationData.brand,
                date: publicationData.date,   
                price: publicationData.price,
                description: publicationData.description,
                horsePowers: publicationData.horsePowers,
                kilometers: publicationData.kilometers,
                upload: undefined
            }
        }
    else if(publicationData.publicationType === 'service'){
        return {
            publicationType : publicationData.publicationType,
            serviceType: publicationData.serviceType,
            availableUntil: publicationData.availableUntil,
            price: publicationData.price,
            description: publicationData.description,
            upload: undefined
        }
    }
    else if(publicationData.publicationType === 'inventory'){
        return {
            publicationType : publicationData.publicationType,
            inventoryType: publicationData.inventoryType,
            model: publicationData.model,
            brand: publicationData.brand,
            date: publicationData.date,
            price: publicationData.price,
            description : publicationData.description,
            upload: undefined
        }
    }
    else if(publicationData.publicationType === 'other'){
        return {
            publicationType : publicationData.publicationType,
            name: publicationData.name,
            price: publicationData.price,
            quantity: publicationData.quantity,
            description: publicationData.description,
            upload: undefined
        }
    }
 }
}

export const setInputsForState = (forAction , publicationType,publicationData) => {
   let inputs = forAction === 'create' ? handlers[forAction](publicationType) : handlers[forAction](publicationData)
   return inputs
}