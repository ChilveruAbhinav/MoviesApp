import {Link} from 'react-router-dom'
import {AiOutlineSearch} from 'react-icons/ai'

// import Cookies from 'js-cookie'

import './index.css'

const Header = () => (
  <nav className="navbar">
    <div className="nav-logo-container">
      <Link to="/">
        <img
          src="https://res.cloudinary.com/dno62jfce/image/upload/v1677301167/Group_7399pro_title_dfoapz.png"
          alt="website logo"
          className="nav-logo"
        />
      </Link>
      <ul className="nav-menu">
        <li className="nav-menu-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li className="nav-menu-item">
          <Link to="/popular" className="nav-link">
            Popular
          </Link>
        </li>
      </ul>
    </div>
    <div className="nav-logo-container">
      <button type="button" className="search-button">
        <AiOutlineSearch className="icon" />
      </button>
      <Link to="/account" className="nav-link">
        <img
          src="https://res.cloudinary.com/dno62jfce/image/upload/v1677305209/Avataravatar_g2lebe.png"
          alt="avatar"
          className="avatar"
        />
      </Link>
    </div>
  </nav>
)

export default Header
