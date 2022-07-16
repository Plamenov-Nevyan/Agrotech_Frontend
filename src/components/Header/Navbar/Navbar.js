import {NavLink} from "react-router-dom"
import styles from "../css/navbar.module.css"

export const Navbar = (props) => {
    return (
        <div className={styles.navbar}>
        <NavLink to='/' className={isActive => isActive.isActive ? styles.active : ''}><i className="fa fa-fw fa-home"></i> Home</NavLink>
        <NavLink to="/catalogue" className={isActive => isActive.isActive ? styles.active : ''}><i className="fa fa-fw fa-business-time"></i> Marketplace</NavLink>
        <NavLink to="/login" className={isActive => isActive.isActive ? styles.active : ''}><i className="fa fa-fw fa-user"></i> Sign up</NavLink>
        <NavLink to="/create" className={isActive => isActive.isActive ? styles.active : ''}><i className="fa-regular fa-file-lines"></i> Create Publication</NavLink>
      </div>
    )
}