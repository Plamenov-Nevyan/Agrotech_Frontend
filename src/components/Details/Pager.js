

export const Pager = ({onPageChange, totalPages}) => {
    let individualPages = []
    for(let i = 1; i <= totalPages; i++){
        individualPages.push(i)
    }
 return (
    <div>
     {individualPages.map(page => <button onClick={(e) => onPageChange(Number(e.target.textContent))}>{page}</button>)}
    </div>
 )
}