import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../global/CartContext'
import { auth, db } from '../../conifg/Config'
import { collection, addDoc } from 'firebase/firestore'
import './Check.css'

const CheckoutProcess = ({ userEmail }) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [address, setAddress] = useState('')
  const [orderId, setOrderId] = useState(null)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const { state, dispatch } = useCart()

  const handleConfirmPurchase = async () => {
    try {
      if (!auth.currentUser) {
        setError('Debes iniciar sesión para realizar una compra.')
        navigate('/login')
        return
      }

      if (!firstName.trim() || !lastName.trim()) {
        setError('Por favor, ingresa tu nombre y apellido.')
        return
      }

      const orderRef = await addDoc(collection(db, 'orders'), {
        userId: auth.currentUser.uid,
        userEmail: userEmail || auth.currentUser.email,
        firstName,
        lastName,
        address,
        products: state.shoppingCart.map((item) => ({
          productId: item.ProductId,
          name: item.name,
          price: item.price,
          quantity: item.qty,
          image: item.imagen
        })),
        total: state.totalPrice,
        createdAt: new Date(),
        status: 'Pending'
      })

      setOrderId(orderRef.id)
      dispatch({ type: 'CLEAR_CART' }) // Vaciar el carrito después de la compra
    } catch (error) {
      console.error('Error al crear la orden:', error)
      setError(
        'Hubo un problema al procesar tu orden. Por favor, inténtalo de nuevo.'
      )
    }
  }

  const handleClose = () => {
    navigate('/')
  }

  const handleCloseCart = () => {
    window.location.reload() // Recarga la página actual
  }

  return (
    <div className='checkout-process'>
      {!orderId ? (
        <div className='checkout-popup'>
          <h3>Ingresa tu nombre y apellido</h3>
          <input
            type='text'
            placeholder='Nombre'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type='text'
            placeholder='Apellido'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            type='text'
            placeholder='Dirección'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          {error && <p className='error-msg'>{error}</p>}
          <button
            className='checkout-btn'
            onClick={handleConfirmPurchase}
          >
            Aceptar
          </button>
          <button
            className='checkout-btn'
            onClick={handleCloseCart}
          >
            Cerrar
          </button>
        </div>
      ) : (
        <div className='checkout-popup'>
          <p>Orden creada con éxito. ID de la orden: {orderId}</p>
          <button
            className='checkout-btn'
            onClick={handleClose}
          >
            Cerrar
          </button>
        </div>
      )}
    </div>
  )
}

export default CheckoutProcess
