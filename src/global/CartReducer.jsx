// CartReducer.js
const CartReducer = (state, action) => {
  const { shoppingCart, totalPrice, totalQty } = state

  switch (action.type) {
    case 'ADD_TO_CART': {
      const { product } = action
      const existingProduct = shoppingCart.find(
        (item) => item.ProductId === product.ProductId
      )

      if (existingProduct) {
        console.log('Product is already in your cart')
        return state
      } else {
        const newProduct = { ...product, qty: 1 }
        const updatedCart = [...shoppingCart, newProduct]
        const updatedPrice = totalPrice + newProduct.price
        const updatedQty = totalQty + 1

        return {
          ...state,
          shoppingCart: updatedCart,
          totalPrice: updatedPrice,
          totalQty: updatedQty
        }
      }
    }

    case 'REMOVE_FROM_CART': {
      const { productId } = action
      const updatedCart = shoppingCart.filter(
        (item) => item.ProductId !== productId
      )
      const productToRemove = shoppingCart.find(
        (item) => item.ProductId === productId
      )
      const updatedPrice = productToRemove
        ? totalPrice - productToRemove.price * productToRemove.qty
        : totalPrice
      const updatedQty = productToRemove
        ? totalQty - productToRemove.qty
        : totalQty

      return {
        ...state,
        shoppingCart: updatedCart,
        totalPrice: updatedCart.length === 0 ? 0 : updatedPrice,
        totalQty: updatedCart.length === 0 ? 0 : updatedQty
      }
    }

    case 'INCREASE_QUANTITY': {
      const { productId } = action
      const updatedCart = shoppingCart.map((item) => {
        if (item.ProductId === productId) {
          return { ...item, qty: item.qty + 1 }
        }
        return item
      })
      const product = shoppingCart.find((item) => item.ProductId === productId)
      const updatedPrice = totalPrice + product.price
      const updatedQty = totalQty + 1

      return {
        ...state,
        shoppingCart: updatedCart,
        totalPrice: updatedPrice,
        totalQty: updatedQty
      }
    }

    case 'DECREASE_QUANTITY': {
      const { productId } = action
      const updatedCart = shoppingCart.map((item) => {
        if (item.ProductId === productId && item.qty > 1) {
          return { ...item, qty: item.qty - 1 }
        }
        return item
      })
      const product = shoppingCart.find((item) => item.ProductId === productId)
      const updatedPrice = totalPrice - product.price
      const updatedQty = totalQty - 1

      return {
        ...state,
        shoppingCart: updatedCart,
        totalPrice: updatedCart.length === 0 ? 0 : updatedPrice,
        totalQty: updatedCart.length === 0 ? 0 : updatedQty
      }
    }
    case 'CLEAR_CART':
      return {
        ...state,
        shoppingCart: [],
        totalPrice: 0,
        totalQty: 0
      }

    default:
      return state
  }
}

export default CartReducer
