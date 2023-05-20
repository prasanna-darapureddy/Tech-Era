import {Link} from 'react-router-dom'

import './index.css'

const Header = () => (
  <>
    <Link to="/" className="header-link-item">
      <div className="header-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
          alt="website logo"
          className="logo-img"
        />
      </div>
    </Link>
  </>
)
export default Header
