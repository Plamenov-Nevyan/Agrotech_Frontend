import { useContext } from "react"
import {NavLink} from "react-router-dom"  
import styles from "../css/navbar.module.css"
import { authContext } from "../../../contexts/authContext"


export const Navbar = ({logoutModalShow}) => {
  const {onUserSignUp_SignIn, authData} = useContext(authContext)
    return (
        <div className={styles.navbar}>
        <NavLink to='/' className={isActive => isActive.isActive ? styles.active : ''}><i className="fa fa-fw fa-home"></i> Home</NavLink>
        <NavLink to="/catalogue" className={isActive => isActive.isActive ? styles.active : ''}><i className="fa fa-fw fa-business-time"></i> Marketplace</NavLink>
        {authData !== null
         ? <>
           <NavLink to="/create" className={isActive => isActive.isActive ? styles.active : ''}><i className="fa-regular fa-file-lines"></i> Create Publication</NavLink>
           <a onClick={(e) => logoutModalShow(e)} className={isActive => isActive.isActive ? styles.active : ''}><i className="fa fa-fw fa-user"></i> Logout</a>
         </>
         :<>
          <NavLink to="/login" className={isActive => isActive.isActive ? styles.active : ''}><i className="fa fa-fw fa-user"></i> Sign up</NavLink>
         </>
        }     
      </div>
    )
}