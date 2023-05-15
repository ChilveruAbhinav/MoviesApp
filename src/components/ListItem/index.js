import './index.css'

const ListItem = props => {
  const {det} = props
  const {name} = det
  //  console.log(name)
  return (
    <li className="list-item">
      <p className="pa">{name}</p>
    </li>
  )
}
export default ListItem
