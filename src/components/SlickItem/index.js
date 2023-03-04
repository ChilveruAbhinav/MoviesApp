import './index.css'

const SlickItem = props => {
  const {slickData} = props
  const {posterPath, movieTitle} = slickData
  return (
    <div className="slick-item">
      <img src={posterPath} alt={movieTitle} className="slick-img" />
    </div>
  )
}
export default SlickItem
