import React, { createContext, useState, useMemo } from 'react'
import { useProducts } from './hooks/useProducts'

export const ProductsContext = createContext()

export const ProductsProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])

  // const addItemToCart = (item) => {
  //   setCartItems([...cartItems, item])
  // }

  // const removeItemFromCart = (item) => {
  //   const updatedCartItems = cartItems.filter(
  //     (cartItem) => cartItem.id !== item.id
  //   )
  //   setCartItems(updatedCartItems)
  // }

  // const clearCart = () => {
  //   setCartItems([])
  // }

  const { products, categories, isLoading, error } = useProducts()

  const value = useMemo(() => {
    return {
      products,
      categories,
      cartItems,
      isLoading,
      error,
    }
  }, [products, categories, cartItems, isLoading, error])

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  )
}
