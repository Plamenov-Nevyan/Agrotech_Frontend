import styles from "./css/catalogue.module.css"
import { useState, useEffect, useCallback } from "react";
import { ProductCard } from "./ProductCard.js/ProductCard";
import { SubHeader } from "../SubHeader/SubHeader";
import { Search } from "./Search/Search";

export const Catalogue = () => {
 const [publications, setPublications] = useState([])
 const [sortType, setType] = useState('recent')


 useEffect(() => {
const getData = async () => {
    let resp = await fetch('http://localhost:5000/publications/marketplace')
    let allPublications = await resp.json()
  setPublications(allPublications)
}
getData()
 }, [])
  
let publicationsFiltered = publications.slice(0)
if(sortType == 'oldest'){
  publicationsFiltered = publicationsFiltered.sort((a,b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
}
else if(sortType == 'recent'){
  publicationsFiltered = publicationsFiltered.sort((a,b) => Date.parse(a.createdAt) - Date.parse(b.createdAt))
}

    return (
        <>
        <SubHeader typesToShow={setType}/>
        <Search />
        <div className={styles.row}>
          {publications.length > 0
          ?  (publicationsFiltered.map((publication) => <ProductCard key={publication._id} {...publication} />))
          : <h1>No Publications posted yet..</h1>
          }
        </div>
    </>
    )
}