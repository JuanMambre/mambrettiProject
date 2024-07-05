import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../conifg/Config'
import { useCart } from '../../global/CartContext'
import './Detail.css'

const Detail = () => {
  const { productId } = useParams()
  const [product, setProduct] = useState(null)
  const { dispatch } = useCart()
  const navigate = useNavigate()
  const [quantity, setQuantity] = useState(1)
  const [showPopup, setShowPopup] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productRef = doc(db, 'products', productId)
        const docSnapshot = await getDoc(productRef)

        if (docSnapshot.exists()) {
          const productData = docSnapshot.data()
          setProduct({ ...productData, ProductId: docSnapshot.id })
        } else {
          console.log('No existe el producto con el ID proporcionado.')
        }
      } catch (error) {
        console.error('Error al obtener el producto:', error)
      }
    }

    if (productId) {
      fetchProduct()
    }
  }, [productId])

  const handleAddToCart = () => {
    if (quantity > 0 && product) {
      dispatch({ type: 'ADD_TO_CART', product: { ...product, quantity } })
      setShowPopup(true)
    }
  }

  const handleGoToCart = () => {
    setShowPopup(false)
    navigate('/cart')
  }

  const handleContinueShopping = () => {
    setShowPopup(false)
  }

  const handleQuantityChange = (event) => {
    const value = Math.max(
      1,
      Math.min(product?.stock || 1, parseInt(event.target.value))
    )
    setQuantity(value)
  }

  return (
    <div className='detail-container'>
      {product ? (
        <div className='product-details'>
          <div className='product-img'>
            <img
              src={product.imagen}
              alt={product.name}
            />
          </div>
          <div className='product-info'>
            <div className='product-name'>{product.name}</div>
            <div className='product-price'>Precio: ${product.price}</div>
            <div className='product-stock'>Stock: {product.stock}</div>
            <input
              type='number'
              value={quantity}
              onChange={handleQuantityChange}
              min='1'
              max={product.stock}
            />
          </div>

          <button
            className='addcart-btn'
            onClick={handleAddToCart}
          >
            ADD TO CART
          </button>

          {showPopup && (
            <div className='popup'>
              <div className='popup-content'>
                <p>¿Quiere finalizar su compra?</p>
                <div className='popup-buttons'>
                  <button
                    className='popup-btn'
                    onClick={handleGoToCart}
                  >
                    Ir al Carrito
                  </button>
                  <button
                    className='popup-btn'
                    onClick={handleContinueShopping}
                  >
                    Continuar Comprando
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <p>Cargando detalles del producto...</p>
      )}
    </div>
  )
}

export default Detail
