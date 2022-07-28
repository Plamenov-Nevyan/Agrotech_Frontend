import {Link} from "react-router-dom"
import styles from '../css/publications.module.css'

export const Publication = ({publication}) => {
    return (
        <Link to={`/catalogue/details/${publication._id}`} className={styles.link_container}>
        <div className={styles.recent_info}>
            <img src={publication.image} />
            <h4>{publication.publicationType === 'product' || publication.publicationType === 'other'
                 ? publication.name
                 : publication.publicationType === 'vehicle' || publication.publicationType === 'Inventory'
                    ? publication.model
                    : publication.serviceType
                }
            </h4>
        </div>
        </Link>
    )
} 