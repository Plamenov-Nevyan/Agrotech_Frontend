import styles from "./chat.module.css"

export const ContactsList = ({contacts, onContactChoose}) => {
    contacts.forEach(contact => {
        // Add parsed date and time properties of the message for every unique user
        contact.date = contact.createdAt.split('T')[0]
        contact.time = contact.createdAt.split('T')[1].split('.')[0]
    })

    let areThereContacts = contacts.length > 0

    return (
    <ul className={styles.contacts_list}>
        {areThereContacts
          ? contacts.map(contact => 
          <li 
          className={styles.contact_li_item} 
        // Get the contact id, for requesting transcript with him/her  
          onClick={() => onContactChoose(contact.msgType === 'received' ? contact.sender._id : contact.receiver._id)}
          >
            <div className={styles.contact_info}>
                    <img src={contact.sender.image}/>
                    <h4>From {contact.msgType === 'received'
                                ? contact.sender.username
                                : `You`
                    }</h4>
                    <p>
                        {contact.content.length > 30
                        ? contact.content.slice(0, Math.ceil(contact.content.length / 2)) + `...`
                        : contact.content
                        }
                    </p>
                    {contact.msgType === 'sent' && <h3 className={styles.receiver_name}>To {contact.receiver.username}</h3>}
                    <h5>On {contact.date}</h5>
                    <h6>{contact.time}</h6>
                </div>
            </li>)
          : <h3>No messages initiated yet...</h3>
       
        }
    </ul>
    )
}