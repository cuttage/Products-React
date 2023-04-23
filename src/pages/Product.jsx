import React, { useEffect, useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import Rating from '@mui/material/Rating'

import useCategoryName from '../hooks/useCategoryName'
import { addItemToCart } from '../store/cart.slice'
import { setSelectedProducts } from '../store/filter.slice'

const Product = () => {
  const history = useHistory()
  const { id } = useParams()
  const dispatch = useDispatch()
  const products = useSelector((state) => state.cart.products)

  const [foundProduct, setFoundProduct] = useState(null)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    if (products) {
      const product = products.find((product) => product.id.toString() === id)
      setFoundProduct(product)
    }
  }, [id, products])

  const categoryName = useCallback((name) => {
    return useCategoryName(name)
  }, [])

  const euroFormatter = new Intl.NumberFormat('en-US-POSIX', {
    style: 'currency',
    currency: 'EUR',
    currencyDisplay: 'narrowSymbol',
  })

  const handleAddToCart = () => {
    dispatch(addItemToCart(foundProduct))
  }

  const handleDotClick = (index) => {
    setActiveImageIndex(index)
  }

  const handleNext = () => {
    setActiveImageIndex((prevIndex) =>
      prevIndex === foundProduct.images.length - 1 ? 0 : prevIndex + 1
    )
    setActiveStep((prevStep) =>
      prevStep === foundProduct.images.length - 1 ? 0 : prevStep + 1
    )
  }

  const handleClick = (index) => {
    setActiveStep(index)
    handleDotClick(index)
  }

  const handleNavigation = (category) => {
    const newSelectedProducts = products.filter((product) => {
      return categoryName(product.category) === categoryName(category)
    })
    dispatch(setSelectedProducts(newSelectedProducts))
    history.push('/')
  }

  return (
    <div>
      {foundProduct && (
        <>
          <div className="breadcrumb-container">
            <ul className="breadcrumb-list">
              <li className="breadcrumb-item">
                <p>{'Categoria'.toUpperCase()}</p>
              </li>
              <li className="breadcrumb-item">
                <p onClick={() => handleNavigation(foundProduct.category)}>
                  {categoryName(foundProduct.category).toUpperCase()}
                </p>
              </li>
              <li className="breadcrumb-item active">
                {foundProduct.title.toUpperCase()}
              </li>
            </ul>
          </div>
          <div className="product-container">
            <div className="product-image-prewrapper">
              <div
                className="product-image-wrapper"
                onClick={handleNext}
                role="button"
                tabIndex={0}
              >
                <img
                  src={foundProduct.images[activeImageIndex]}
                  alt={foundProduct.title}
                  className="product-image"
                />
              </div>
              <div className="stepper">
                <div className="stepper-dots">
                  {foundProduct.images.map((image, index) => (
                    <span
                      className={index === activeStep ? 'dot active' : 'dot'}
                      key={image}
                      onClick={() => handleClick(index)}
                      disabled={
                        activeStep === 0 ||
                        activeStep === foundProduct.images.length - 1
                      }
                    ></span>
                  ))}
                </div>
              </div>
            </div>

            <div className="product-info">
              <h1 className="product-name">
                {foundProduct.title.toUpperCase()}
              </h1>
              <p className="product-price">
                {euroFormatter.format(foundProduct.price)}
              </p>
              <p className="product-description-tag">
                {'Descrizione'.toUpperCase()}
              </p>
              <p className="product-description">{foundProduct.description}</p>
              <p className="product-description-tag">{'Marca'.toUpperCase()}</p>
              <p className="product-description">
                {foundProduct.brand.toUpperCase()}
              </p>
              <p className="product-description-tag">
                {'Categoria'.toUpperCase()}
              </p>
              <p className="product-description">
                {categoryName(foundProduct.category).toUpperCase()}
              </p>
              {foundProduct.rating && (
                <>
                  <p className="product-description-tag">
                    {'Recensioni'.toUpperCase()}
                  </p>
                  <p className="product-description">
                    <Rating
                      name="read-only"
                      value={foundProduct.rating}
                      readOnly
                    />
                  </p>
                </>
              )}
              <button className="add-to-cart" onClick={handleAddToCart}>
                {'Aggiungi al carrello'.toUpperCase()}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Product
