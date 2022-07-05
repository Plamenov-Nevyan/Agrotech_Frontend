import styles from "./css/details.module.css"
export const Comment = () => {
    return (
        <li className={styles.comment}>
            <a href="/profile/user"><header className={styles.comment_author}>Pesho</header></a>
            <p className={styles.comment_content}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempore incidunt praesentium similique iste odit, ipsa, esse impedit qui ipsam, sit eaque fugit. Consequuntur velit esse ducimus, est ullam sed voluptatum?</p>
        </li>
    )
}