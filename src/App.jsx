import React, { useEffect, useState } from 'react'
import { Route, Router, Routes } from 'react-router-dom'
import './index.css'
import Home from './components/Home/Home'
import Navbar from './components/NavBar/Navbar'
import AddProduct from './components/AddProduct/AddProduct'
import Products from './components/Products/Products'
import { ProductContextProvider } from './global/ProductContext'
import SignUp from './components/Auth/SignUp'
import LogIn from './components/Auth/LogIn'
import { auth, db } from './conifg/Config' // Asegúrate de importar correctamente auth y db
import { collection, doc, getDoc } from 'firebase/firestore' // Importación actualizada de Firestore
import Detail from './components/Detail/Detail' // Importa el componente Detail
import Cart from './components/Cart/Cart'
import { CartContextProvider } from './global/CartContext'

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const userRef = doc(collection(db, 'SignedUpUserData'), user.uid) // Referencia correcta
          const snapshot = await getDoc(userRef) // Consulta del documento
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

    // Cleanup subscription on unmount
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

export default App
