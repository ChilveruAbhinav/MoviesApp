import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import './index.css'

const Footer = () => (
  <>
    <div className="footer">
      <div className="icons-container">
        <button type="button" className="button-icon">
          <FaGoogle className="foot-icon" />
        </button>
        <button type="button" className="button-icon">
          <FaTwitter className="foot-icon" />
        </button>
        <button type="button" className="button-icon">
          <FaInstagram className="foot-icon" />
        </button>
        <button type="button" className="button-icon">
          <FaYoutube className="foot-icon" />
        </button>
      </div>
      <p className="contact-us-para">Contact us</p>
    </div>
  </>
)
export default Footer
