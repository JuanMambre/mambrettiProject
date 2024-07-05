import React, { useState } from 'react'
import { collection, addDoc } from 'firebase/firestore'
import { db, auth } from '../../conifg/Config'
import { useCart } from '../../global/CartContext'
import { useNavigate } from 'react-router-dom'

const Checkout = () => {
  const { state, dispatch } = useCart()
  const [orderId, setOrderId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const navigate = useNavigate()

  const handleOrder = async () => {
    if (!auth.currentUser) {
      setError('Debes estar autenticado para realizar una compra.')
      navigate('/login')
      return
    }

    if (!firstName || !lastName) {
      setError('Por favor, ingresa tu nombre y apellido.')
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Crear la orden en Firestore
      const orderRef = await addDoc(collection(db, 'orders'), {
        userId: auth.currentUser.uid, // Captura la información del usuario autenticado
        userEmail: auth.currentUser.email, // Opcional: el email del usuario
        firstName,
        lastName,
        products: state.shoppingCart.map((item) => ({
          productId: item.ProductId,
          name: item.name,
          price: item.price,
          quantity: item.qty,
          image: item.imagen // Ajusta según tu estructura de datos
        })),
        total: state.totalPrice,
        createdAt: new Date(),
        status: 'Pending' // Puedes ajustar el estado de la orden
      })

      setOrderId(orderRef.id)
      dispatch({ type: 'CLEAR_CART' }) // Vacía el carrito
      setLoading(false)

      // Mostrar alerta con el ID de la orden
      alert(`Orden creada con éxito. ID de la orden: ${orderRef.id}`)
    } catch (error) {
      console.error('Error al crear la orden:', error)
      setError(
        'Hubo un problema al procesar tu orden. Por favor, inténtalo de nuevo.'
      )
      setLoading(false)
    }
  }

  return (
    <div>
      {loading && <p>Procesando tu orden...</p>}
      {orderId ? (
        <div>Orden creada con éxito. ID de la orden: {orderId}</div>
      ) : (
        <>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <div>
            <label>Nombre:</label>
            <input
              type='text'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Apellido:</label>
            <input
              type='text'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <button onClick={handleOrder}>Finalizar Compra</button>
        </>
      )}
    </div>
  )
}

export default Checkout
