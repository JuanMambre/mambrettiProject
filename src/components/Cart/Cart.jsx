import React, { useState, useEffect } from 'react'
import { useCart } from '../../global/CartContext'
import { auth, db } from '../../conifg/Config'
import { useNavigate } from 'react-router-dom'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { Icon } from 'react-icons-kit'
import { remove } from 'react-icons-kit/fa/remove'
import { plus } from 'react-icons-kit/fa/plus'
import { minus } from 'react-icons-kit/fa/minus'
import './Cart.css'

const Cart = () => {
  const { state, dispatch } = useCart()
  const { shoppingCart, totalPrice, totalQty } = state
  const navigate = useNavigate()

  const [isAuthChecked, setIsAuthChecked] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user)
      setIsAuthChecked(true)
      if (user) {
        setEmail(user.email) // Establecer el email del usuario autenticado
      }
    })

    return () => unsubscribe()
  }, [])

  const handleRemoveFromCart = (productId) => {
    dispatch({ type: 'REMOVE_FROM_CART', productId })
  }

  const handleIncreaseQuantity = (productId) => {
    dispatch({ type: 'INCREASE_QUANTITY', productId })
  }

  const handleDecreaseQuantity = (productId) => {
    dispatch({ type: 'DECREASE_QUANTITY', productId })
  }

  const handlePurchase = () => {
    if (currentUser) {
      setShowPopup(true)
    } else {
      alert('Para proceder con tu compra debes loguearte.')
      navigate('/login')
    }
  }

  const handleConfirmPurchase = async (e) => {
    e.preventDefault()

    try {
      // Crear consulta para obtener el documento con el email
      const q = query(
        collection(db, 'SignedUpUserData'),
        where('Email', '==', email)
      )
      const querySnapshot = await getDocs(q)

      // Verificar si se encontró el usuario y si la contraseña es correcta
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0].data()
        if (userDoc.Password === password) {
          // Comparar contraseñas directamente
          setShowPopup(false)
          alert('Compra realizada con éxito.')
          // Vaciar el carrito después de la compra
          dispatch({ type: 'CLEAR_CART' })
        } else {
          alert('Contraseña incorrecta.')
        }
      } else {
        alert('No se encontró un usuario con ese email.')
      }
    } catch (error) {
      alert('Hubo un error al verificar las credenciales.')
      console.error('Error verifying credentials:', error)
    }
  }

  return (
    <div className='cart-container'>
      <h2>Carrito de Compras</h2>
      <p className='cart-summary'>Total Price: ${totalPrice}</p>
      <p className='cart-summary'>Total Quantity: {totalQty}</p>
      <ul className='cart-items'>
        {shoppingCart.map((item) => (
          <li
            key={item.ProductId}
            className='cart-item'
          >
            <div className='item-details'>
              <div className='item-image'>
                <img
                  src={item.imagen}
                  alt={item.name}
                />
              </div>
              <div className='item-info'>
                <div className='item-name'>{item.name}</div>
                <div className='item-description'>{item.description}</div>
                <div className='item-price'>${item.price}</div>
              </div>
            </div>
            <div className='item-actions'>
              <button
                className='action-btn'
                disabled={item.qty <= 1}
                onClick={() => handleDecreaseQuantity(item.ProductId)}
              >
                <Icon
                  icon={minus}
                  size={12}
                />
              </button>
              <input
                type='number'
                className='qty-input'
                value={item.qty}
                readOnly
              />
              <button
                className='action-btn'
                disabled={item.qty >= item.stock}
                onClick={() => handleIncreaseQuantity(item.ProductId)}
              >
                <Icon
                  icon={plus}
                  size={12}
                />
              </button>
              <button
                className='action-btn'
                onClick={() => handleRemoveFromCart(item.ProductId)}
              >
                <Icon
                  icon={remove}
                  size={12}
                />
              </button>
              <button
                className='purchase-btn'
                onClick={handlePurchase}
              >
                Comprar
              </button>
            </div>
          </li>
        ))}
      </ul>

      {showPopup && (
        <div className='popup'>
          <form
            onSubmit={handleConfirmPurchase}
            className='popup-content'
          >
            <label>
              Email:
              <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled // Deshabilitar el campo de email
              />
            </label>
            <label>
              Contraseña:
              <input
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            <div className='popup-buttons'>
              <button
                type='submit'
                className='confirm-btn'
              >
                Confirmar Compra
              </button>
              <button
                type='button'
                className='cancel-btn'
                onClick={() => setShowPopup(false)}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

export default Cart
