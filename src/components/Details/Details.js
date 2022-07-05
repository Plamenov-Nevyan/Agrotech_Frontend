import styles from "./css/details.module.css"
import { Comment } from "./Comment"
import { CommentForm } from "./CommentForm"
import { ImageWrapper } from "./ImageWrapper"
import { InfoWrapper } from "./InfoWrapper"
import { SubHeader } from "../SubHeader/SubHeader"

export const Details = () => {
    return(
        <>
        <SubHeader />
        <div className={styles.wrapper}>
            <ImageWrapper />
            <InfoWrapper />
        </div>
        <h1 className ={styles.comments_title}>Comments</h1>
        <div className={styles.comments}>
           <ul className={styles.comments_list}>
               <Comment />
           </ul>
        </div>
        <div className={styles.add_comment_wrapper}>
           <CommentForm />
        </div>
        </>
    )

}