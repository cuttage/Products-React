import React, { useState, useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Toolbar, Button, Menu, MenuItem } from '@mui/material'
import placeholder from '../assets/placeholder.jpeg'
import useCategoryName from '../hooks/useCategoryName'
import { setSelectedProducts } from '../store/filter.slice'

const Home = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [isEven, setIsEven] = useState(false)
  const [is20, set20] = useState(true)
  const [moreClass, setMoreClass] = useState([])
  const products = useSelector((state) => state.cart.products)
  const categories = useSelector((state) => state.cart.categories)
  const isLoading = useSelector((state) => state.cart.isLoading)
  const error = useSelector((state) => state.cart.error)
  const { selectedProducts } = useSelector((state) => state.filter)
  const dispatch = useDispatch()

  const handleProductsChange = (checkItem) => {
    let products2 = [...products]
    const filteredProducts = products2.filter(
      (product) =>
        categoryName(product.category) === checkItem ||
        product.brand === checkItem
    )
    dispatch(setSelectedProducts(filteredProducts))
  }

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

  useEffect(() => {
    const numSelectedProducts = selectedProducts.length

    if (numSelectedProducts > 0) {
      set20(false)

      if (numSelectedProducts > 3) {
        if (numSelectedProducts % 2 === 0) {
          setIsEven(true)
        } else {
          setIsEven(false)
        }
        setMoreClass([])
      } else if (numSelectedProducts <= 3) {
        setIsEven(false)
        setMoreClass(['product-grid__three'])
      }
    } else {
      set20(true)
      setMoreClass([])
    }
  }, [selectedProducts])

  return (
    <div>
      <section className="nav-wrapper">
        <nav>
          <ul className="navbar__links">
            <li className="navbar__link__title">
              <p className="navbar__link__p__variant">
                {'Categoria'.toUpperCase()}
              </p>
            </li>
            {isLoading ? (
              <p style={{ padding: '15px' }}>Loading...</p>
            ) : (
              <>
                {categories?.length > 0 &&
                  [
                    ...new Set(categories.map((name) => categoryName(name))),
                  ].map((categoryN) => (
                    <li className="navbar__link" key={categoryN}>
                      <p
                        className="navbar__link__p"
                        onClick={() => handleProductsChange(categoryN)}
                      >
                        {categoryN.toUpperCase()}
                      </p>
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
              <p style={{ padding: '15px' }}>Loading...</p>
            ) : (
              products?.length > 0 &&
              [...new Set(products.map((item) => item.brand))].map((brand) => (
                <MenuItem
                  onClick={() => {
                    handleProductsChange(brand)
                    handleClose()
                  }}
                  key={brand}
                >
                  {brand.toUpperCase()}
                </MenuItem>
              ))
            )}
          </Menu>
        </Toolbar>
      </section>
      <section className="product-grid-container">
        <div
          className={
            isEven && !is20
              ? [
                  'product-grid',
                  'product-grid__even',
                  ...(moreClass.length > 0 ? [moreClass[0]] : []),
                ].join(' ')
              : !isEven && !is20
              ? [
                  'product-grid',
                  'product-grid__odd',
                  ...(moreClass.length > 0 ? [moreClass[0]] : []),
                ].join(' ')
              : 'product-grid product-grid__20'
          }
        >
          {isLoading ? (
            <p style={{ padding: '15px' }}>Loading...</p>
          ) : (
            <>
              {selectedProducts.length > 0 ? (
                selectedProducts.map((product) => {
                  const bestImage = getBestImage(product)
                  const categoryN = categoryName(product.category)
                  return (
                    <div
                      className="product-card-wrapper"
                      key={product.id + ' ' + product.title}
                    >
                      <Link
                        to={`/product/${product.id}`}
                        className="product-card"
                      >
                        <div>
                          {bestImage && (
                            <div className="product-card__image-container">
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
                            </div>
                          )}
                        </div>
                      </Link>
                      <h2 className="product-card__name navbar__link__title__variant">
                        {product.title.toUpperCase()}
                      </h2>
                      <h2 className="product-card__name">
                        {categoryN.toUpperCase()}
                      </h2>
                    </div>
                  )
                })
              ) : (
                <>
                  {products?.length > 0 &&
                    products.map((product) => {
                      const bestImage = getBestImage(product)
                      const categoryN = categoryName(product.category)
                      return (
                        <div
                          className="product-card-wrapper"
                          key={product.id + ' ' + product.title}
                        >
                          <Link
                            to={`/product/${product.id}`}
                            className="product-card"
                          >
                            <div>
                              {bestImage && (
                                <div className="product-card__image-container">
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
                                </div>
                              )}
                            </div>
                          </Link>
                          <h2 className="product-card__name navbar__link__title__variant">
                            {product.title.toUpperCase()}
                          </h2>
                          <h2 className="product-card__name">
                            {categoryN.toUpperCase()}
                          </h2>
                        </div>
                      )
                    })}
                </>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  )
}

export default Home
