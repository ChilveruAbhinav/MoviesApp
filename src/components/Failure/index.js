import './index.css'

const Failure = props => {
  const {retryApi} = props
  const onRetry = () => {
    retryApi()
  }
  return (
    <div className="failure-view">
      <img
        src="https://res.cloudinary.com/dno62jfce/image/upload/v1677584620/Iconfail_hy3fvw.png"
        alt="failure view"
        className="fail-img"
      />
      <p className="failure-para">Something went wrong. Please try again</p>
      <button className="retry-button" type="button" onClick={onRetry}>
        Try Again
      </button>
    </div>
  )
}
export default Failure
