// App.js
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import './index.css'
import Home from './components/Home/Home'
import Navbar from './components/NavBar/Navbar'
import AddProduct from './components/AddProduct/AddProduct'
import Products from './components/Products/Products'
import { ProductContextProvider } from './global/ProductContext'
import SignUp from './components/Auth/SignUp'
import LogIn from './components/Auth/LogIn'
import Detail from './components/Detail/Detail'
import Cart from './components/Cart/Cart'
import { CartContextProvider } from './global/CartContext'
import useAuth from './useAuth' // Importa el hook useAuth

function App() {
  const user = useAuth() // Usa el hook useAuth para obtener el estado de autenticación

  return (
    <CartContextProvider>
      <ProductContextProvider>
        <Navbar user={user} />
        <Routes>
          <Route
            path='/'
            element={<Home />}
          />
          <Route
            path='/products'
            element={<Products />}
          />
          <Route
            path='/addproducts'
            element={<AddProduct />}
          />
          <Route
            path='/signup'
            element={<SignUp />}
          />
          <Route
            path='/login'
            element={<LogIn />}
          />
          <Route
            path='/product/:productId'
            element={<Detail />}
          />
          <Route
            path='/cart'
            element={<Cart />}
          />
        </Routes>
      </ProductContextProvider>
    </CartContextProvider>
  )
}

export default App
