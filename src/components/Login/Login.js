import "./css/login.css"
import { LoginForm } from "./Login-Form"
import { RegisterForm } from "./Register-Form"
import { H2ForLogin } from "./h2ForLogin"
import { H2ForRegister } from "./h2ForRegister"
import { useState } from "react"

export const Login = (props) => {
    const [action, setAction] = useState('Register')
    const [profilePic, setProfilePic] = useState(props.fileName || null)

    function actionHandler(e){
        if(e.target.id === `sign-up` && e.target.className !== `active`){
            setAction('Register')
        }
        else if(e.target.id === `sign-in` && e.target.className !== `active`){
            setAction('Login')
            }
    }

    const loginRedirect = (e) => {e.preventDefault(); setAction('Login')}

    function profPicShowcase(e){
        // TO DO WHEN I LEARN HOW TO MAKE API REQUESTS !!
        // IMG TAG ABOVE FILE INPUT MUST SHOW CURRENTLY UPLOADED PIC
    }

    return(
        <div className="wrapper fadeInDown">
  <div id="formContent">
    <div onClick={actionHandler}>
        { action === 'Register' 
        ? (<H2ForRegister />)
        : (< H2ForLogin /> )
        }
    </div>
     {action === 'Register'
      ? ( <div className="fadeIn first">
      <img
        src="http://danielzawadzki.com/codepen/01/icon.svg"
        id="icon"
        alt="Select a profile picture? (Optional)"
      />
      <input type="file" name="upload" id="upload" onChange={profPicShowcase}/>
      </div>)
      : null
     }
    { action === 'Register' 
        ? (<RegisterForm loginRedirect={loginRedirect} />)
        : (<LoginForm /> )
    }
  </div>
</div>
    )
}