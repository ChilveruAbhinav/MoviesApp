import {Link} from 'react-router-dom'
import './index.css'

const PopularItem = props => {
  const {popularDetails} = props
  const {id, posterDrop, popTitle} = popularDetails
  return (
    <li className="item">
      <Link to={`/movies/${id}`} className="link-item">
        <img src={posterDrop} alt={popTitle} className="image" />
      </Link>
    </li>
  )
}
export default PopularItem
