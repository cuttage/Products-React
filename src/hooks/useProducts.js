import { useState, useEffect } from 'react'
import axios from 'axios'

export const useProducts = () => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://dummyjson.com/products?limit=20'
        )
        const products = response.data.products
        const categories = Array.from(
          new Set(products.map((product) => product.category))
        )
        setProducts(products)
        setCategories(categories)
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching products: ', error)
        setError(error)
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  return {
    products,
    categories,
    isLoading,
    error,
  }
}
