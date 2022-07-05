import styles from "../css/form.module.css"
import { useState } from "react"
import { H2ForProducts } from "./h2ForProducts"
import { H2ForServices } from "./h2ForServices"
import { H2ForVehicles } from "./h2ForVehicles"
import { Product } from "./Product"
import { Vehicle_or_Part } from "./Vehicle_or_Part"
import { Service } from "./Service"
import {create} from "../services/createHandler"

export const Form = () => {
const [type, setType] = useState('Products/Others')

  function actionHandler(e){
    if(e.target.id === 'products_others' && e.target.className !== 'active'){
      setType('Products/Others')
    }
    else if(e.target.id === 'agro_vehicles_parts' && e.target.className !== 'active'){
      setType('Agro-Vehicles/Parts')
    }
    else if(e.target.id === 'agro_services' && e.target.className !== 'active'){
      setType('Agro-Services')
    }
  }

    return(
<>
    <form class={styles.form} onSubmit={function(e){create(e, type)}}>
    <div id={styles.formContent} onClick={actionHandler}>
         { type === "Products/Others"
           ? (<H2ForProducts />)
           : type === 'Agro-Vehicles/Parts'
                ? (<H2ForVehicles />)
                : (<H2ForServices />)
         }
    </div>
    <div className={styles.input_holder}>
    { type === "Products/Others"
           ? (<Product />)
           : type === 'Agro-Vehicles/Parts'
                ? (<Vehicle_or_Part />)
                : (<Service />)
         }
    </div>
  </form>
</>
   )
}