import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selectedProducts: [],
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSelectedProducts: (state, action) => {
      state.selectedProducts = action.payload
    },
  },
})

export const { setSelectedProducts } = filterSlice.actions

export default filterSlice.reducer
