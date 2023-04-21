import React, { useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Toolbar, Button, Menu, MenuItem } from '@mui/material'
import logo from '../assets/ff.svg'
import CartIcon from '../components/CartIcon'
import placeholder from '../assets/placeholder.jpeg'
import useCategoryName from '../hooks/useCategoryName'

const Home = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const products = useSelector((state) => state.cart.products)
  const categories = useSelector((state) => state.cart.categories)
  const isLoading = useSelector((state) => state.cart.isLoading)
  const error = useSelector((state) => state.cart.error)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const getBestImage = useCallback((product) => {
    try {
      const thumbnailImage = product.images.find((image) =>
        image.endsWith('thumbnail.jpg')
      )
      if (thumbnailImage) {
        return thumbnailImage
      }
      if (product.images.length >= 1) {
        return product.images[0]
      }
      throw new Error('Product does not have any images')
    } catch (error) {
      console.error(error)
    }
  }, [])

  const categoryName = useCallback((name) => {
    return useCategoryName(name)
  }, [])

  return (
    <div>
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
      <main>
        <section className="nav-wrapper">
          <nav>
            <ul className="navbar__links">
              <li className="navbar__link__title">
                <a href="#">{'Categoria'.toUpperCase()}</a>
              </li>
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                <>
                  {categories?.length > 0 &&
                    [
                      ...new Set(categories.map((name) => categoryName(name))),
                    ].map((categoryN) => (
                      <li className="navbar__link" key={categoryN}>
                        <a href="#">{categoryN.toUpperCase()}</a>
                      </li>
                    ))}
                </>
              )}
            </ul>
          </nav>
          <Toolbar>
            <Button
              id="menu-button"
              aria-controls="menu"
              aria-haspopup="true"
              onClick={handleClick}
              color="inherit"
              className="navbar__link__title marca-button"
            >
              Marca
            </Button>
            <Menu
              id="menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                products?.length > 0 &&
                [...new Set(products.map((item) => item.brand))].map(
                  (brand) => (
                    <MenuItem onClick={handleClose} key={brand}>
                      {brand}
                    </MenuItem>
                  )
                )
              )}
            </Menu>
          </Toolbar>
        </section>
        <section className="product-grid">
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <>
              {products?.length > 0 &&
                products.map((product) => {
                  const bestImage = getBestImage(product)
                  const categoryN = categoryName(product.category)
                  return (
                    <Link
                      to={`/product/${product.id}`}
                      className="product-card"
                      key={product.id + ' ' + product.title}
                    >
                      <div>
                        {bestImage && (
                          <img
                            className="product-card__image"
                            src={placeholder}
                            data-src={bestImage}
                            alt={product.title}
                            onLoad={(e) => {
                              e.target.width = bestImage.naturalWidth
                              e.target.height = bestImage.naturalHeight
                              e.target.src = e.target.dataset.src
                            }}
                          />
                        )}
                        <h2 className="product-card__name navbar__link__title">
                          {product.title.toUpperCase()}
                        </h2>
                        <h2 className="product-card__name">
                          {categoryN.toUpperCase()}
                        </h2>
                      </div>
                    </Link>
                  )
                })}
            </>
          )}
        </section>
      </main>
      <footer>
        <p>&copy; 2023 All rights reserved.</p>
        <nav>
          <ul>
            <li>
              <a className="footer__tab" href="#">
                Home
              </a>
            </li>
            <li>
              <a className="footer__tab" href="#">
                About
              </a>
            </li>
            <li>
              <a className="footer__tab" href="#">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </footer>
    </div>
  )
}

export default Home
