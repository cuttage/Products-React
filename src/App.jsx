import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

import Layout from './components/Layout'
import Home from './pages/Home'
import Product from './pages/Product'
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
      <Layout>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/product/:id" component={Product} />
          </Switch>
        </Router>
      </Layout>
    </Provider>
  )
}

export default App
