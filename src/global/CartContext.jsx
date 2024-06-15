// CartContext.jsx
import React, { createContext, useContext, useReducer, useEffect } from 'react'
import CartReducer from './CartReducer'

const CartContext = createContext()
const initialState = { shoppingCart: [], totalPrice: 0, totalQty: 0 }

const init = () => {
  const localData = localStorage.getItem('cartState')
  return localData ? JSON.parse(localData) : initialState
}

export const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CartReducer, initialState, init)

  useEffect(() => {
    localStorage.setItem('cartState', JSON.stringify(state))
  }, [state])

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  return useContext(CartContext)
}
