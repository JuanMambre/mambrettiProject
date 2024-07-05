import React, { useState } from 'react'
import { useCart } from '../../global/CartContext'
import { auth } from '../../conifg/Config'
import { useNavigate } from 'react-router-dom'
import { Icon } from 'react-icons-kit'
import { remove } from 'react-icons-kit/fa/remove'
import { plus } from 'react-icons-kit/fa/plus'
import { minus } from 'react-icons-kit/fa/minus'
import './Cart.css'
import CheckoutProcess from './checkoutProcess' // Asegúrate de importar correctamente

const Cart = () => {
  const { state, dispatch } = useCart()
  const { shoppingCart, totalPrice, totalQty } = state
  const navigate = useNavigate()
  const [showPopup, setShowPopup] = useState(false)

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
    if (auth.currentUser) {
      setShowPopup(true)
    } else {
      alert('Para proceder con tu compra debes iniciar sesión.')
      navigate('/login')
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
            </div>
          </li>
        ))}
      </ul>
      <button
        className='purchase-btn'
        onClick={handlePurchase}
      >
        Comprar
      </button>

      {showPopup && (
        <div className='popup'>
          <CheckoutProcess userEmail={auth.currentUser.email} />
        </div>
      )}
    </div>
  )
}

export default Cart
