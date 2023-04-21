import React from 'react'
import logo from '../assets/ff.svg'
import CartIcon from '../components/CartIcon'

const Layout = (props) => {
  return (
    <div className="container">
      <header>
        <img src={logo} className="logo" alt="Logo" />
        <nav>
          <ul className="navbar__links">
            <li className="navbar__link__mid">
              <a href="#">{'Shop'.toUpperCase()}</a>
            </li>
            <li className="navbar__link">
              <CartIcon />
            </li>
          </ul>
        </nav>
      </header>
      <main>{props.children}</main>
    </div>
  )
}

export default Layout
