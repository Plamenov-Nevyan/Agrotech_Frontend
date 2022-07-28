import { useState } from "react"
import { registerUser, loginUser } from "../../services/userServices"
import { checkForErrorsRegister, checkForErrorsLogin } from "../../utils/validateUserData"
import styles  from "./css/login.module.css"
import { LoginForm } from "./LoginForm/LoginForm"
import { RegisterForm } from "./RegisterForm/RegisterForm"
import { H2ForLogin } from "./h2ForLogin"
import { H2ForRegister } from "./h2ForRegister"
import { FormFooter } from "./FormFooter/FormFooter"
import { RedirectModal } from "./RedirectModal/RedirectModal"
import { ErrorAlert } from "../Alerts/Error"

export const Login = () => {
    const [action, setAction] = useState('Register')
    const [showRedirModal, setShowRedirModal] = useState({
        show:false,
        content:'',
        linkA:{},
        linkB:{},
        loginOrRegister: '',
        successOrUnsuccessfull: ''
    })
   const [errors, setErrors] = useState([])

function actionHandler(e){
        if(e.target.id === `sign-up` && e.target.className !== `active`){
            setAction('Register')
        }
        else if(e.target.id === `sign-in` && e.target.className !== `active`){
            setAction('Login')
            }
    }

   const onSubmitHandler = (e, userData, action) => {
    e.preventDefault()
    if(userData.userType === 'individual'){
        delete userData.uic; 
        delete userData.location; 
        delete userData.countrySelect
    }
    else if(userData.userType === 'organization'){
        delete userData.phoneNumber; 
        delete userData.gender; 
        delete userData.countrySelect
    }

    let errors = action === 'Register' ? checkForErrorsRegister(userData) : checkForErrorsLogin(userData)


    if(Object.values(userData).includes('')){
    window.scrollTo({top: 0, behavior: 'smooth'})
    return setErrors(oldErrors => ['Please enter the required information'])
    } 
    else if(action === 'Register' && userData.password !== userData.confirm){
    window.scrollTo({top: 0, behavior: 'smooth'})
    return setErrors(oldErrors => ['Passwords must match each other!'])
    }
    else if(errors.length > 0 ){
    window.scrollTo({top: 0, behavior: 'smooth'})
    return setErrors(oldErrors => [...errors])
    }
    else{setErrors([])}
   
     if(action === 'Register'){
        registerUser(userData)
        .then((newUser) => {
            setShowRedirModal(state => {
                return{
                    ...state,
                    show:true,
                    content : `Your registration was successfull ${newUser.username}! 
                                Would you like to head back to the home page or go and review
                                what's being offered on the marketplace?`,
                    linkA: {
                        href: '/',
                        name: 'Home Page'
                    },
                    linkB: {
                        href: '/catalogue',
                        name: 'View the marketplace'
                    },
                    loginOrRegister: 'Registration',
                    successOrUnsuccessfull: 'Succesfull' 
                }
            })
        } 
        )
        .catch(err => {
            console.log(err)
            window.scrollTo({top: 0, behavior: 'smooth'})
            setErrors([err.message])
        })
     }
     else if(action === 'Login'){
        loginUser(userData)
        .then((loggedUser) => {
            setShowRedirModal(state => {
                return{
                    ...state,
                    show:true,
                    content : ` Welcome back ${loggedUser.username}! 
                                Would you like to head back to the home page or go and 
                                look at what's new on the marketplace?`,
                    linkA: {
                        href: '/',
                        name: 'Home Page'
                    },
                    linkB: {
                        href: '/catalogue',
                        name: 'View the marketplace'
                    },
                    loginOrRegister: 'Login',
                    successOrUnsuccessfull: 'Succesfull' 
                }
            })
        
          }
        )
        .catch(err => {
           window.scrollTo({top: 0, behavior: 'smooth'})
           setErrors([err.message])
        })
     }
   }

   const onCloseHandler = () => setShowRedirModal(state => {return {...state, show:!state.show}})

    return(
        <>
        {errors.length > 0 && <ErrorAlert errors={errors}/>}
       {showRedirModal.show &&  
       <RedirectModal 
       content={showRedirModal.content} 
       onCloseHandler={onCloseHandler}
       linkA={showRedirModal.linkA}
       linkB={showRedirModal.linkB}
       loginOrRegister={showRedirModal.loginOrRegister}
       successOrUnsuccessfull={showRedirModal.successOrUnsuccessfull}
       />
       }
        <div className= {styles.wrapper + " " + styles.fadeInDown}>
  <div id={styles.formContent}>
    <div className={styles.action_container} onClick={actionHandler}>
        { action === 'Register' 
        ? (<H2ForRegister />)
        : (< H2ForLogin /> )
        }
    </div>
    <div className={styles.form_wrapper}>
    { action === 'Register' 
        ? (<RegisterForm onSubmitHandler={onSubmitHandler}/>)
        : (<LoginForm onSubmitHandler={onSubmitHandler}/> )
    }
    <FormFooter action={action} setAction={setAction}/>
    </div>
  </div>
</div>
</>
    )
}