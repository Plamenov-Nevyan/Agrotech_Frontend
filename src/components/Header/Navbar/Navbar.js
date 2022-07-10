import styles from "../css/navbar.module.css"

export const Navbar = (props) => {
    return (
        <div className={styles.navbar}>
        <a className={styles.active} href="/"><i className="fa fa-fw fa-home"></i> Home</a>
        <a href="/catalogue"><i className="fa fa-fw fa-business-time"></i> Marketplace</a>
        <a href="/login"><i className="fa fa-fw fa-user"></i> Sign up</a>
        <a href="/create"><i className="fa-regular fa-file-lines"></i> Create Publication</a>
      </div>
    )
}