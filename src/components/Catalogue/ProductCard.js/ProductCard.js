export const ProductCard = () => {
    return(
        <div className="a-box">
  <div className="img-container">
    <div className="img-inner">
      <div className="inner-skew">
        <img src="https://images.unsplash.com/photo-1584791097929-aa825fe8e1e1?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ" />
      </div>
    </div>
  </div>
  <div className="text-container">
    <h3>A blue bird</h3>
    <div><a id="details-btn" href="#">More Details</a></div>
  </div>
</div>
    )
}