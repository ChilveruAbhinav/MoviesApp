import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const Account = props => {
  const username = localStorage.getItem('username')
  const password = localStorage.getItem('password')
  const passText = '*'.repeat(password.length)
  const onLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  const getAccountJsx = () => (
    <>
      <div className="account-container">
        <h1 className="account-heading">Account</h1>
        <hr className="line" />
        <div className="details-container">
          <p className="account-para">Member ship</p>
          <div className="user-container">
            <p className="acc-username">{username}@gmail.com</p>
            <p className="acc-password">Password: {passText}</p>
          </div>
        </div>
        <hr className="line" />
        <div className="details-container">
          <p className="account-para">Plan details</p>
          <p className="plan">Premium</p>
          <p className="quality">Ultra HD</p>
        </div>
        <hr className="line" />
        <button className="logout-button" type="button" onClick={onLogout}>
          Logout
        </button>
      </div>
    </>
  )

  return (
    <>
      <Header />
      {getAccountJsx()}
      <Footer />
    </>
  )
}

export default withRouter(Account)
