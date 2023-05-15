import './index.css'

const SimilarItem = props => {
  const {simData} = props
  const {similarTitle, similarPosterPath} = simData
  return (
    <li className="sim-item">
      <img src={similarPosterPath} alt={similarTitle} className="sim-image" />
    </li>
  )
}
export default SimilarItem
