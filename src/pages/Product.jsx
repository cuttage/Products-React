import React, { useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import useCategoryName from '../hooks/useCategoryName'
import Rating from '@mui/material/Rating'
import { addItemToCart } from '../store/cart.slice'

const Product = () => {
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
      console.log(foundProduct)
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
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
    handleDotClick(activeStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
    handleDotClick(activeStep - 1)
  }

  return (
    <div>
      {foundProduct && (
        <>
          <div className="breadcrumb-container">
            <ul className="breadcrumb-list">
              <li className="breadcrumb-item">
                <a href="#">{'Categoria'.toUpperCase()}</a>
              </li>
              <li className="breadcrumb-item">
                <a href="#">
                  {categoryName(foundProduct.category).toUpperCase()}
                </a>
              </li>
              <li className="breadcrumb-item active">
                {foundProduct.title.toUpperCase()}
              </li>
            </ul>
          </div>
          <div className="product-container">
            <div className="product-image-prewrapper">
              <div className="product-image-wrapper">
                <img
                  src={foundProduct.images[activeImageIndex]}
                  alt={foundProduct.title}
                  className="product-image"
                />
              </div>
              <div class="stepper">
                <button
                  class="stepper-btn"
                  id="back-btn"
                  onClick={handleBack}
                  disabled={activeStep === 0}
                >
                  Back
                </button>
                <div class="stepper-dots">
                  {foundProduct.images.map((image, index) => (
                    <span
                      class={index === activeStep ? 'dot active' : 'dot'}
                    ></span>
                  ))}
                </div>
                <button
                  class="stepper-btn"
                  id="next-btn"
                  onClick={handleNext}
                  disabled={activeStep === foundProduct.images.length - 1}
                >
                  Next
                </button>
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
