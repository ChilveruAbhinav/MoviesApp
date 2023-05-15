import {Link} from 'react-router-dom'
import './index.css'

const SearchItem = props => {
  const {eachMovie} = props
  const {id, title, posterPath} = eachMovie
  return (
    <Link to={`/movies/${id}`} className="link-item">
      <li className="search-list-item">
        <img src={posterPath} alt={title} className="search-img" />
      </li>
    </Link>
  )
}
export default SearchItem
