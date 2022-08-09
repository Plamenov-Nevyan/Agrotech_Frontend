import {useState, useEffect, useContext, useRef} from "react"
import { authContext } from "../../contexts/authContext"
import {getMostRecentFromUniqueSenders, getTranscript, checkForNewMessages, sendMessage} from "../../services/messageServices"
import styles from "./chat.module.css"
import { ContactsList } from "./ContactsList"
import { useSocket } from "../../hooks/useSocket";


export const Chat = () => {
    const [messages, setMessages] = useState([])
    const [transcript, setTranscript ] = useState([])
    const [sendMsgInput, setSendMsgInput] = useState('')
    const [currentContact, setCurrentContact] = useState('')
    const {_, authData, __} = useContext(authContext)
    const transcriptCount = useRef(null)
    

    useEffect(() => {
        getMostRecentFromUniqueSenders(authData._id)
        .then(receivedMessages => setMessages(receivedMessages))
        .catch(err => console.log(err))
    }, [])

    useEffect(() => {
      clearInterval(transcriptCount.current)

      transcriptCount.current = setInterval(() => {
        if(currentContact !== ''){
          checkForNewMessages(authData._id, transcript.length, currentContact)
          .then(newMessages =>{
            if(newMessages.length > 0){
              setTranscript(oldTranscript => [...oldTranscript, ...newMessages])
            }
          }
        )
          .catch(err => console.log(err))
        }
      }, 5000)

      return () => clearInterval(transcriptCount.current)
    }, [currentContact])

    const onContactChoose = (contactId) => {
      getTranscript(contactId, authData._id)
      .then(receivedTranscript => {
        setTranscript(oldTranscript => [...oldTranscript, ...receivedTranscript])
        setCurrentContact(contactId)
      })
      .catch(err => console.log(err))
    } 
    
    const sendMessageHandler = async (e,content, receiver, sender) => {
      e.preventDefault()
      if(content){
        let data = {
          content,
          sender : authData._id,
          receiver : currentContact
        }
       await sendMessage(data, authData.accessToken)
      }
    }

    const onSendInputChange = (e) => setSendMsgInput(e.target.value)

    return (
    <div className={styles.wrapper}>
        <div className={styles.contacts_container}>
          <ContactsList contacts={messages} onContactChoose={onContactChoose} />
        </div>
        <div className={styles.messages_container}>
            {transcript.length > 0
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
              : <h2>Loading transcript ...</h2>
            }
           
            
    </div>
    <form className={styles.send_message_form}>
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
    </form>
</div>
 )
}