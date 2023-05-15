import './index.css'

const ListItemAudio = props => {
  const {det} = props
  const {audio} = det
  // console.log(englishName)
  return (
    <li className="list-item">
      <p className="pa">{audio}</p>
    </li>
  )
}
export default ListItemAudio
