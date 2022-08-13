import {useState, useEffect, useContext, useRef} from "react"
import { authContext } from "../../contexts/authContext"
import {getMostRecentFromUniqueSenders, getTranscript, sendMessage} from "../../services/messageServices"
import { SmallLoadingSpinner } from "../SmallLoadingSpinner/SmallLoadingSpinner"
import styles from "./chat.module.css"
import { ContactsList } from "./ContactsList"
import { ErrorAlert } from "../Alerts/Error"


export const Chat = () => {
    const [messages, setMessages] = useState([])
    const [transcript, setTranscript ] = useState(null)
    const [sendMsgInput, setSendMsgInput] = useState('')
    const [currentContact, setCurrentContact] = useState('')
    const {_, authData, __} = useContext(authContext)
    const [errors, setErrors] = useState([])
    const transcriptCount = useRef(null)
    

    useEffect(() => {
        getMostRecentFromUniqueSenders(authData._id)
        .then(receivedMessages => setMessages(receivedMessages))
        .catch(err => setErrors(oldErrors => [...oldErrors, err.message]))
    }, [])

    useEffect(() => {
      clearInterval(transcriptCount.current)
      transcriptCount.current = setInterval((transcriptLength) => {
        if(currentContact !== ''){
          getTranscript(authData._id, currentContact)
          .then(newMessages => {
            if(newMessages.length > 0){
              setTranscript(oldTranscript => [...newMessages])
            }
          }
        )
          .catch(err => setErrors(oldErrors => [...oldErrors, err.message]))
        }
      }, 5000)

      return () => clearInterval(transcriptCount.current)
    }, [currentContact])

    const onContactChoose = (contactId) => {
      getTranscript(contactId, authData._id)
      .then(receivedTranscript => {
        setTranscript(oldTranscript => [...receivedTranscript])
        setCurrentContact(contactId)
      })
      .catch(err => setErrors(oldErrors => [...oldErrors, err.message]))
    } 
    
    const sendMessageHandler = async (e,content, receiver, sender) => {
      e.preventDefault()
      if(content){
        let data = {
          content,
          sender : authData._id,
          receiver : currentContact
        }
        try{
           await sendMessage(data, authData.accessToken)
           setSendMsgInput(' ')
        }catch(err){
          setErrors(oldErrors => [...oldErrors, err.message])
        }
      }
    }

    const onSendInputChange = (e) => setSendMsgInput(e.target.value)

    return (
    <div className={styles.wrapper}>
        <div className={styles.contacts_container}>
          <ContactsList contacts={messages} onContactChoose={onContactChoose} />
        </div>
        <div className={styles.messages_container}>
            {transcript !== null
            ? transcript.length > 0
              ? transcript.map(message => message.msgType === 'received'
                  ? <div className={styles.container}>
                        <img src={message.sender.image} alt="Avatar" />
                        <h4>{message.sender.username}</h4>
                        <p>{message.content}</p>
                        <span className="time-right">{message.createdAt.split('T')[1].split('.')[0]}</span>
                    </div>
             
                  : <div className={styles['container'] + ' ' + styles['darker']}>
                        <img src={message.receiver.image} alt="Avatar" className={styles.right} />
                        <p>{message.content}</p>
                        <span className={styles['time-left']}>{message.createdAt.split('T')[1].split('.')[0]}</span>
                     </div>
              )
              : <h2>No messages yet...</h2>
            : null
            }
           
            
    </div>
    {transcript !== null && <form className={styles.send_message_form}>
         <input 
         type="text" 
         name="sendMessage" 
         className={styles.send_msg_input} 
         placeholder="Type your message here..."
         value={sendMsgInput}
         onChange={(e) => onSendInputChange(e)}
         />
         <button 
         className={styles.send_msg_btn} 
         onClick={(e) => sendMessageHandler(e, sendMsgInput, authData._id, currentContact)}
         >
          Send
          </button>
    </form>}
</div>
 )
}