import styles from "./css/catalogue.module.css"
import { useState, useEffect} from "react";
import { getLimitedPublications} from "../../services/publicationServices";
import { constants } from "../../config/constants";
import { sortPublications } from "../../utils/sortPublications";
import { ProductCard } from "./ProductCard.js/ProductCard";
import { SubHeader } from "../SubHeader/SubHeader";
import { Search } from "./Search/Search";
import { ScrollArrow } from "../ScrollArrow/ScrollArrow";
import { CategorySelect } from "./Category/CategorySelect";

export const Catalogue = () => {
 const [publicationsData, setPublicationsData] = useState()
 const [sortType, setType] = useState('mostRecent')

useEffect(() => {
  const getInitial = async() => {
    let publicationsDataReceived = await getLimitedPublications(
      0, 
      constants.publicationsPerRequest, 
      sortType
      )
    setPublicationsData(publicationsDataReceived)
  }
  getInitial()
}, [])

const onLoadHandler = () => {
  getLimitedPublications(
    publicationsData.publications.length,
    constants.publicationsPerRequest, 
    sortType
    )
    .then(( publicationsDataReceived) => setPublicationsData(currentData => {
      return { 
       publications: [...currentData.publications, ...publicationsDataReceived.publications],
       count : currentData.count - publicationsDataReceived.count,
       noMoreRemaining : publicationsDataReceived.noMoreRemaining}
     })
    )
    .catch(err => console.log(err))
}

let sortedPublications = publicationsData ? publicationsData.publications.slice(0) : []

    return (
        <>
        <SubHeader typesToShow={setType}/>
        <div>
        <Search />
        <CategorySelect />
        </div>
        <div className={styles.row}>
          { publicationsData
          ?  publicationsData.publications.length > 0
            ? (sortPublications(sortType, sortedPublications).map((publication) => <ProductCard key={publication._id} {...publication} />))
            : <h1>No Publications posted yet..</h1>
          : <h1>Loading...</h1>
          }
        </div>
        {publicationsData
         ? publicationsData.noMoreRemaining
           ? <h1 className={styles.no_more_remaining}>No more publications remaining...</h1>
           : (
            <div className={styles.load_more_container}>
           <button onClick={onLoadHandler}>Load more</button>
           <h2>{publicationsData.count} publications remaining..</h2>
           </div>
           )
         : ''
        }
        <ScrollArrow />
    </>
    )
}