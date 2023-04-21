import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import Product from './pages/Product'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import cartReducer, { fetchProducts } from './store/cart.slice'

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
})

const App = () => {
  useEffect(() => {
    store.dispatch(fetchProducts())
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/product/:id" component={Product} />
        </Switch>
      </Router>
    </Provider>
  )
}

export default App
