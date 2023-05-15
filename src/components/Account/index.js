import Cookies from 'js-cookie'
import Footer from '../Footer'
import Header from '../Header'
import './index.css'

const Account = props => {
  const onLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <>
      <Header />
      <div className="account-page">
        <h1 className="account-heading">Account</h1>
        <hr className="separator" />
        <div className="member-ship-details">
          <p className="member-ship-text">Member ship</p>
          <div className="userDetails">
            <p className="username">Abhinav@gmail.com</p>
            <p className="password">Password</p>
            <span>: **********</span>
          </div>
        </div>
        <hr className="separator" />
        <div className="plan-details">
          <p className="plan-details-text">Plan details</p>
          <p className="plan-name">Premium</p>
          <p className="plan-feature">Ultra HD</p>
        </div>
        <hr className="separator" />
        <button onClick={onLogout} type="button" className="log-out-btn">
          Logout
        </button>
      </div>
      <Footer />
    </>
  )
}

export default Account
