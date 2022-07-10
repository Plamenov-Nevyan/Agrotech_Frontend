import styles from "../css/form.module.css"
import { Inputs } from "./Inputs"
import {create} from "../services/createHandler"

export const Form = () => {

    return(
<>
    <form className={styles.form} onSubmit={function(e){create(e)}} encType="multipart/form-data">
    <div id={styles.formContent}>
      <h1 className={styles.active}>Create a new publication, and post it on the market!</h1>
    </div>
    <div className={styles.input_holder}>
        <Inputs />
    </div>
  </form>
</>
   )
}