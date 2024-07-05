import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './index.css'
import Home from './components/Home/Home'
import Navbar from './components/NavBar/Navbar'
import AddProduct from './components/AddProduct/AddProduct'
import Products from './components/Products/Products'
import { ProductContextProvider } from './global/ProductContext'
import SignUp from './components/Auth/SignUp'
import LogIn from './components/Auth/LogIn'
import { auth, db } from './conifg/Config'
import { collection, doc, getDoc } from 'firebase/firestore'
import Detail from './components/Detail/Detail'
import Cart from './components/Cart/Cart'
import { CartContextProvider } from './global/CartContext'

function authListener() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const userRef = doc(collection(db, 'SignedUpUserData'), user.uid)
          const snapshot = await getDoc(userRef)
          if (snapshot.exists()) {
            setUser(snapshot.data().Name)
          }
        } catch (error) {
          console.error('Error al obtener los datos del usuario:', error)
        }
      } else {
        setUser(null)
      }
    })

    return () => unsubscribe()
  }, [])

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

export default authListener
