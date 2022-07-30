const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
const usernameRegex = /^[a-zA-Z0-9_. ]+$/
const uicRegex = /^[0-9]+$/
const locationRegex = /^[A-Za-z]+,[A-Za-z]+$/

export const isPasswordValid = (password) => {
    let isPasswordStrong = password.length >= 8

    const errors = []

     if(!isPasswordStrong && password !== ''){
        errors.push('Password must be at least 8 characters long!')
    }
    return errors
}

export const isConfirmValid = (confirm) => {
    let isConfirmStrong = confirm.length >= 8

    const errors = []

     if(!isConfirmStrong && confirm !== ''){
        errors.push('Password must be at least 8 characters long!')
    }
    return errors
}

export const isEmailValid = (email) => {
    let isValid = emailRegex.test(email)
    let isStrong = email.length >= 4
    let isTooLong = email.length > 30

    const errors = []

     if(!isValid && email !== ''){
        errors.push('Please enter a valid email adress!')
    }
     if(!isStrong && email !== ''){
        errors.push('Email must be atleast 5 characters long!')
    }
     if(isTooLong){
        errors.push('Email must be maximum 20 characters long!')
     }

    return errors
}

export const isUsernameValid = (username) => {
   let isValid = usernameRegex.test(username)
   let isStrong = username.length >= 5
   let isTooLong = username.length > 15
   const errors = []

   if(!isValid && username !== ''){
    errors.push('Username must contain legal characters only (A-Z, 0-9, _ , . )!')
   }
   if(!isStrong && username !== ''){
    errors.push('Username must be at least 5 characters long!')
   }
   if(isTooLong){
    errors.push('Username must maximum 15 characters long!')
   }
   return errors
}

export const isUicValid = (uic) => {
    let isValid = uicRegex.test(uic)
    let isLengthCorrect = uic.length === 10
    const errors = []
    if(!isValid){errors.push('Universal identification code must consist of digits only!')}
    if(!isLengthCorrect){errors.push('Universal identification code must be exactly 10 characters long')}
    return errors
}

export const isLocationValid = (location) => {
   let isValid = locationRegex.test(location)
   let errors = []
   if(!isValid){errors.push('Location format is invalid')}
   return errors
}

export const isPhoneNumValid = (phoneNumber) => {
    let isValid = phoneNumber.startsWith('+')
    let isTooLong = phoneNumber.length > 11
    let errors = []
    if(!isValid || isTooLong){errors.push('Please enter a valid phone number!')}
    return errors
}