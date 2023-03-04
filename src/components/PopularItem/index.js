import './index.css'

const PopularItem = props => {
  const {popularDetails} = props
  const {posterDrop, popTitle} = popularDetails
  return (
    <li className="item">
      <img src={posterDrop} alt={popTitle} className="image" />
    </li>
  )
}
export default PopularItem
