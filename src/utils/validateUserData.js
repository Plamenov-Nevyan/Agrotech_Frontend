import * as authValidators from "./authValidators"

export const checkForErrorsRegister = (userData) => {
    let errors = []
   if(userData.userType === 'individual'){
      let usernameErrors = authValidators.isUsernameValid(userData.username)
      let emailErrors = authValidators.isEmailValid(userData.email)
      let passwordErrors = authValidators.isPasswordValid(userData.password)
      let confirmErrors = authValidators.isConfirmValid(userData.confirm)
      let phoneNumErrors = authValidators.isPhoneNumValid(userData.phoneNumber)
      errors = [...usernameErrors, ...emailErrors, ...passwordErrors, ...confirmErrors, ...phoneNumErrors] 
   }
   else if(userData.userType === 'organization'){
    let usernameErrors = authValidators.isUsernameValid(userData.username)
    let emailErrors = authValidators.isEmailValid(userData.email)
    let passwordErrors = authValidators.isPasswordValid(userData.password)
    let confirmErrors = authValidators.isConfirmValid(userData.confirm)
    let uicErrors = authValidators.isUicValid(userData.uic)
    let locationErrors = authValidators.isLocationValid(userData.location)
     errors = [...usernameErrors, ...emailErrors, ...passwordErrors, ...confirmErrors, ...uicErrors, ...locationErrors]  
 }

 return errors
}

export const checkForErrorsLogin = (userData) => {
   let errors = []
   let emailErrors = authValidators.isEmailValid(userData.email)
   let passwordErrors = authValidators.isPasswordValid(userData.password)
   errors = [...emailErrors, ...passwordErrors]
   return errors
}