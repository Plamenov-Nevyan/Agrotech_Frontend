
export const sortWhenAddComment = (sortType, comments, newComment) => {
  if(sortType === 'recent'){
    comments.shift()
    return comments.unshift(newComment)
}
  else {return comments}
}