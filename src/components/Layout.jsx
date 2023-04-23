import React, { useState, useEffect } from 'react'
import logoSm from '../assets/ff_mob.svg'
import logoLg from '../assets/ff.svg'
import CartIcon from '../components/CartIcon'

const Layout = (props) => {
  const [isLgScreen, setIsLgScreen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsLgScreen(window.innerWidth >= 768)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="container">
      <header>
        <img src={isLgScreen ? logoLg : logoSm} className="logo" alt="Logo" />
        <nav>
          <ul className="navbar__links">
            <li className="navbar__link__mid">
              <p>{'Shop'.toUpperCase()}</p>
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
