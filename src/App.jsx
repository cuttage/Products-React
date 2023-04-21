import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import Product from './pages/Product'
import { ProductsProvider } from './ProductsContext'

const App = () => {
  return (
    <ProductsProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/product/:id" component={Product} />
        </Switch>
      </Router>
    </ProductsProvider>
  )
}

export default App
