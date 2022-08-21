import styles from "../css/details.module.css"
export const CommentSort = ({onSortChangeHandler}) => {
return(
    <div>
        <select name="commentSort" className={styles.comment_sort} id="commentSort" onChange={(e) => onSortChangeHandler(e)}>
            <option value="recent">Most Recent</option>
            <option value="oldest">Oldest</option>
        </select>
    </div>
)
}