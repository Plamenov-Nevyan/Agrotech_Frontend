import styles from "./css/catalogue.module.css"
import { useState, useEffect} from "react";
import { useLocation } from 'react-router-dom'
import { getLimitedPublications} from "../../services/publicationServices";
import { constants } from "../../config/constants";
import { sortPublications } from "../../utils/sortPublications";
import { ProductCard } from "./ProductCard.js/ProductCard";
import { SubHeader } from "../SubHeader/SubHeader";
import { Sort } from "./Sort/Sort";
import { Search } from "./Search/Search";
import { ScrollArrow } from "../ScrollArrow/ScrollArrow";
import { CategorySelect } from "./Category/CategorySelect";
import { SuccessAlert } from "../Alerts/Success"
import { ErrorAlert } from "../Alerts/Error";
import {SmallLoadingSpinner} from "../SmallLoadingSpinner/SmallLoadingSpinner"

export const Catalogue = () => {
  // Set state for the loaded publications data
 const [publicationsData, setPublicationsData] = useState(null)
 //  Set state for the sorting type chosen by the user
 const [sortType, setType] = useState('mostRecent')
  //  Set state for the category type chosen by the user
 const [category, setCategory] = useState('all')
 const [spinnerOnLoadMore, setShowSpinner] = useState(false)
  //  Set state for the search parameter passed by the user
 const [searchParam, setSearchParam] = useState(null)
  //  Set state for showing the success alert when creating new publication and redirecting to catalogue
 const [showSuccessAlert, setShowSuccessAlert] = useState(false)
  //  Set state for errors
 const [errors, setErrors] = useState([])
 const location = useLocation()

 useEffect(() => {
   //  get the confirmation for showing success alert when redirecting from create component, using useLocation hook 
  if(location.state !== null && location.state.showSuccessAlert){
   setShowSuccessAlert(true)
  }
  }, [location])

useEffect(() => {
  // Get the initial load of publications at component mount, without skipping any
  try{
    const getInitial = async() => {
      let publicationsDataReceived = await getLimitedPublications(
        sortType,
        0, 
        constants.publicationsPerRequest, 
        category,
        searchParam  
        )
      setPublicationsData(publicationsDataReceived)
    }
    getInitial()
  }
  catch(err){
    setErrors(oldErrors => [...oldErrors, err.message])
  }
}, [searchParam , category])

const onLoadHandler = () => {
  // Get new load of publications and check if there are any remaining in the backend, on clicking the "Load more" button
  setShowSpinner(true)
  getLimitedPublications(
    sortType,
    publicationsData.publications.length,
    constants.publicationsPerRequest, 
    // If there is search parameter (a.k.a -> !== null), set it in the arguments, otherwise set the category
    searchParam || category
    )
    .then(( publicationsDataReceived) => setPublicationsData(currentData => {
      setShowSpinner(false)
      return { 
       publications: [...currentData.publications, ...publicationsDataReceived.publications],
       count : currentData.count - publicationsDataReceived.count,
       noMoreRemaining : publicationsDataReceived.noMoreRemaining}
     })
    )
    .catch(err => setErrors(oldErrors => [...oldErrors, err.message]))
}

const onSearch = (e) => {
  // Get the search param from the input, when user click the "Search" button and set the search parameter state
  e.preventDefault()
  let {search} = Object.fromEntries(new FormData(e.currentTarget))
  setSearchParam(search)
}

// Getting new reference of the publications array, available for sorting
let sortedPublications = publicationsData ? publicationsData.publications.slice(0) : []

let areThereErrors = errors.length > 0
let isTherePublicationsData = publicationsData !== null
let isTherePublications
isTherePublicationsData ? isTherePublications =  publicationsData.publications.length > 0 : isTherePublications = false

    return (
        <>
         {areThereErrors && <ErrorAlert errors={errors}/>}
        {showSuccessAlert && <SuccessAlert message={'Publication created successfully !'}/>}
        <SubHeader/>
        <div className={styles.data_modif_inputs}>
        <Search value={searchParam} onSearch={onSearch}/>
        <Sort typesToShow={setType}/>
        <CategorySelect categoryToShow={setCategory}/>
        </div>
        <div className={styles.row}>
          { isTherePublicationsData
          ?  isTherePublications
          // if publications are present sort, map them and render the 'Product Card' component with the info from each one of them
            ? (sortPublications(sortType, sortedPublications).map((publication) => 
            <ProductCard 
                key={publication._id} 
                {...publication} 
            />
            ))
            : <h1 className={styles.not_available}>No Publications posted yet..</h1>
          : <SmallLoadingSpinner />
          }
        </div>
        { isTherePublicationsData
         ? publicationsData.noMoreRemaining
           ? isTherePublications
              ? <h1 className={styles.no_more_remaining}>No more publications remaining...</h1>
              : ''
           : (
            <div className={styles.load_more_container}>
           {spinnerOnLoadMore
          //  Show loading spinner when loading publications, and "Load more" button when request is finished
            ? <SmallLoadingSpinner />
            : <button onClick={onLoadHandler}>Load more</button>
           }
           <h2>{publicationsData.count} publications remaining..</h2>
           </div>
           )
         : ''
        }
        <ScrollArrow />
    </>
    )
}