import styles from  "./css/footer.module.css"
import {Link} from "react-router-dom"
import {useState, useContext} from "react"
import { authContext } from "../../contexts/authContext"
import { sendEmail } from "../../services/messageServices"

export const Footer = () => {
    const [inputValues, setInputValues] = useState({
        email: '',
        subject : '',
       content : ''
    })

    const {_, authData, __} = useContext(authContext)

    const onChangeHandler = (e) => {
        setInputValues(oldValues => {
            return {
                ...oldValues,
                [e.target.name] : e.target.value 
            }
        })
    }

    const onSubmitHandler = (e,sender, subject, content) => {
        e.preventDefault()
        if (sender && subject && content){
          sendEmail(sender,subject,content)
          .then(respMessage => 
            setInputValues(oldValues => {})
            )
          .catch(err => console.log(err))
        }
    }

    const setEmailOnClick = () => {
        if(authData){setInputValues(oldValues => {return {...oldValues, email : authData.email }})}
    }

    return(
        <footer className={styles['footer-distributed']}>
        <div className={styles['footer-left']}>
          <h3>
            Agro<span>Tech</span>
          </h3>
          <p className={styles['footer-links']}>
            <Link to={'/'}>Home</Link>·<Link to={"/about"}>About</Link>·<Link to={"/faq"}>FAQ</Link>
          </p>
          <p className={styles['footer-company-name']}>Agro-Tech Market © 2015</p>
          <div className={styles['footer-icons']}>
            <a href= "facebook.com">
            <i class="fa-brands fa-facebook-f"></i>
            </a>
            <a href="twitter.com">
            <i class="fab fa-twitter"></i>
            </a>
            <a href="youtube.com">
            <i class="fab fa-youtube"></i>
            </a>
            <a href="instagram.com">
            <i class="fa-brands fa-instagram"></i>
            </a>
          </div>
        </div>
        <div className={styles['footer-right']}>
          <p>Contact Us</p>
          <form onSubmit={(e) => onSubmitHandler(
            e, 
            authData.email || inputValues.email, 
            inputValues.subject, 
            inputValues.content)
            }
            >
          <input
             type="text" 
             name="email" 
             placeholder="Your email adress..." 
             value={inputValues.email} 
             onChange={(e) => onChangeHandler(e)}
             onClick={() => setEmailOnClick()}
             />
            <input
             type="text" 
             name="subject" 
             placeholder="Subject..." 
             value={inputValues.subject} 
             onChange={(e) => onChangeHandler(e)}
             />
            <textarea 
            name="content" 
            placeholder="Message..." 
            value={inputValues.content}  
            onChange={(e) => onChangeHandler(e)}
            />
            <button className={styles.send_btn}>Send</button>
          </form>
        </div>
      </footer>
    )
}