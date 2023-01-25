import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import {BiHome} from 'react-icons/bi'
import {BsBriefcase} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'

import './index.css'

class Navbar extends Component {
  render() {
    const {history} = this.props

    const onLogout = () => {
      Cookies.remove('jwt_token')
      history.replace('/login')
    }

    return (
      <>
        <nav className="navbar-sm-container">
          <ul className="navbar-functionality-container">
            <Link to="/">
              <img
                src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
                alt="website logo"
                className="jobby-logo"
              />
            </Link>
            <ul className="sm-icons-container">
              <li>
                <Link to="/">
                  <BiHome className="sm-icon" />
                </Link>
              </li>
              <li>
                <Link to="/jobs">
                  <BsBriefcase className="sm-icon" />
                </Link>
              </li>
              <li>
                <FiLogOut onClick={onLogout} className="sm-icon" />
              </li>
            </ul>
          </ul>
        </nav>
        <nav className="navbar-lg-container">
          <ul className="navbar-link-container">
            <li>
              <Link to="/">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
                  alt="website-logo"
                  className="jobby-lg-logo"
                />{' '}
              </Link>
            </li>
            <li>
              <div className="navbar-navigation-lg-links-container">
                <Link to="/">
                  <h1 className="navbar-link">Home</h1>
                </Link>
                <Link to="/jobs">
                  <h1 className="navbar-link">Jobs</h1>
                </Link>
              </div>
            </li>
            <li>
              <button
                onClick={onLogout}
                className="logout-button"
                type="button"
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </>
    )
  }
}

export default withRouter(Navbar)
