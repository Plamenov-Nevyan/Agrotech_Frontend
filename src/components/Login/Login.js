import { useState } from "react"
import styles  from "./css/login.module.css"
import { LoginForm } from "./LoginForm/LoginForm"
import { RegisterForm } from "./RegisterForm/RegisterForm"
import { H2ForLogin } from "./h2ForLogin"
import { H2ForRegister } from "./h2ForRegister"
import { FormFooter } from "./FormFooter/FormFooter"
import { registerUser, loginUser } from "../../services/userServices"

export const Login = (props) => {
    const [action, setAction] = useState('Register')
 

    function actionHandler(e){
        if(e.target.id === `sign-up` && e.target.className !== `active`){
            setAction('Register')
        }
        else if(e.target.id === `sign-in` && e.target.className !== `active`){
            setAction('Login')
            }
    }

   const onSubmitHandler = (e, userData) => {
    e.preventDefault()
    console.log(userData)
     if(action == 'Register'){
        registerUser(userData)
        .then((newUser) => console.log(newUser))
        .catch(err => console.log(err))
     }
     else{
        loginUser(userData)
        .then((loggedUser) => console.log(loggedUser))
        .catch(err => console.log(err))
     }
   }

    return(
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
    )
}