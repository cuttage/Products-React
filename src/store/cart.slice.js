import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  products: [],
  categories: [],
  cartItems: [],
  isLoading: false,
  error: null,
}

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    try {
      const response = await axios.get(
        'https://dummyjson.com/products?limit=20'
      )
      const products = response.data.products
      const categories = Array.from(
        new Set(products.map((product) => product.category))
      )
      return { products, categories }
    } catch (error) {
      console.error('Error fetching products: ', error)
      throw error
    }
  }
)

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      state.cartItems.push(action.payload)
    },
    removeItemFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (cartItem) => cartItem.id !== action.payload.id
      )
    },
    clearCart: (state) => {
      state.cartItems = []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload.products
        state.categories = action.payload.categories
        state.isLoading = false
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.error = action.error.message
        state.isLoading = false
      })
  },
})

export const { addItemToCart, removeItemFromCart, clearCart } =
  cartSlice.actions

export default cartSlice.reducer
