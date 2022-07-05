import styles from "./css/details.module.css"

export const CommentForm = () => {
    return (
        <article className={styles.add_comment}>
            <form id={styles.comment_form}>
                <textarea
                    name="content"
                    id={styles.content}
                    placeholder="Type your comment..."
                    defaultValue={""}
                />
                <input id={styles.commentBtn} type="submit" defaultValue="Add comment" />
            </form>
        </article>
    )
}