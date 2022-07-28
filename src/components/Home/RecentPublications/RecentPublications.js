import {useState, useEffect} from 'react'
import {getMostRecent} from '../../../services/publicationServices'
import styles from "../css/publications.module.css"
import {Publication} from "./Publication"


export const RecentPublications = () => {
    const [recentPublications, setRecentPublications] = useState([])

    useEffect(() => {
      getMostRecent()
      .then(publications => setRecentPublications(publications))
      .catch(err => console.log(err))
    })

    return (
        <div className={styles.recent_container}>
            <h2 className={styles.recent_heading}>Most recent publications</h2>
             {recentPublications.length > 0
               ? recentPublications.map(publication => <Publication key={publication._id} publication={publication} />)
               : <h3>Loading...</h3>
             }
        </div>
    )
}