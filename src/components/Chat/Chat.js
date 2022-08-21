import {useState, useEffect, useContext, useRef} from "react"
import { authContext } from "../../contexts/authContext"
import {getMostRecentFromUniqueSenders, getTranscript, sendMessage} from "../../services/messageServices"
import { SmallLoadingSpinner } from "../SmallLoadingSpinner/SmallLoadingSpinner"
import styles from "./chat.module.css"
import { ContactsList } from "./ContactsList"
import { ErrorAlert } from "../Alerts/Error"


export const Chat = () => {
  // Set the state for array of most recent message (received or sent) from unique users
    const [messages, setMessages] = useState([])
  // Set the state for the chat transcript (all messages received or sent)  with a unique user
    const [transcript, setTranscript ] = useState(null)
  // Set the state fot the message input of the user, prepared for a request to the backend
    const [sendMsgInput, setSendMsgInput] = useState('')
  // Set the state for the contact with who, the user wants to receive transcript 
    const [currentContact, setCurrentContact] = useState('')
    const {_, authData, __} = useContext(authContext)
    // Set state for errors 
    const [errors, setErrors] = useState([])
    
    const transcriptReceiveInterval = useRef(null)
    
    console.log(messages)

    useEffect(() => {
      // Get the most recent message (received or sent) from unique users at component mount
        getMostRecentFromUniqueSenders(authData._id)
        .then(receivedMessages => setMessages(receivedMessages))
        .catch(err => setErrors(oldErrors => [...oldErrors, err.message]))
    }, [])

    useEffect(() => {
      // Send a request every 5 sec, checking for new messages and reset the transcript so changes can be rendered (long pulling)
      clearInterval(transcriptReceiveInterval.current)
      transcriptReceiveInterval.current = setInterval(() => {
        if(currentContact !== ''){
          getTranscript(currentContact, authData._id)
          .then(newMessages => {
            if(newMessages.length > 0){
              setTranscript(oldTranscript => [...newMessages])
            }
          }
        )
          .catch(err => setErrors(oldErrors => [...oldErrors, err.message]))
        }
      }, 5000)

      // Clear interval on component unmount, to prevent memory leaks
      return () => clearInterval(transcriptReceiveInterval.current)
    }, [currentContact])

    const onContactChoose = (contactId) => {
      //  Get most recent transcript with the contact chosen by the user 
      getTranscript(contactId, authData._id)
      .then(receivedTranscript => {
        setTranscript(oldTranscript => [...receivedTranscript])
        setCurrentContact(contactId)
      })
      .catch(err => setErrors(oldErrors => [...oldErrors, err.message]))
    } 
    
    const sendMessageHandler = async (e,content, receiver, sender) => {
      // Sends the data from the "send message" input to the backend, where it's sent to the current contact,
      e.preventDefault()
      if(content){
        let data = {
          content,
          sender : authData._id,
          receiver : currentContact
        }
        try{
           await sendMessage(data, authData.accessToken)
           setSendMsgInput('')
        }catch(err){
          setErrors(oldErrors => [...oldErrors, err.message])
        }
      }
    }

    // Change the message content to send
    const onSendInputChange = (e) => setSendMsgInput(e.target.value)

    let isThereTranscript = transcript !== null
    let isThereTranscriptMessages = isThereTranscript ? transcript.length > 0 : false
   

    return (
    <div className={styles.wrapper}>
        <div className={styles.contacts_container}>
          <ContactsList contacts={messages} onContactChoose={onContactChoose} />
        </div>
        <div className={styles.messages_container}>
            {isThereTranscript
              ? isThereTranscriptMessages
                //  Apply different stylization according to the message type 
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
            : <SmallLoadingSpinner />
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