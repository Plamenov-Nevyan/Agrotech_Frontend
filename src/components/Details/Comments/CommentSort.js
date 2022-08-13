
export const CommentSort = ({onSortChangeHandler}) => {
return(
    <div>
        <select name="commentSort" id="commentSort" onChange={(e) => onSortChangeHandler(e)}>
            <option value="recent">Most Recent</option>
            <option value="oldest">Oldest</option>
        </select>
    </div>
)
}