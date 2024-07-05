const CartReducer = (state, action) => {
  const { shoppingCart, totalPrice, totalQty } = state

  switch (action.type) {
    case 'ADD_TO_CART': {
      const { product } = action
      const existingProduct = shoppingCart.find(
        (item) => item.ProductId === product.ProductId
      )

      if (existingProduct) {
        const updatedCart = shoppingCart.map((item) =>
          item.ProductId === product.ProductId
            ? { ...item, qty: item.qty + product.quantity }
            : item
        )
        const updatedPrice = totalPrice + product.price * product.quantity
        const updatedQty = totalQty + product.quantity

        return {
          ...state,
          shoppingCart: updatedCart,
          totalPrice: updatedPrice,
          totalQty: updatedQty
        }
      } else {
        const newProduct = { ...product, qty: product.quantity }
        const updatedCart = [...shoppingCart, newProduct]
        const updatedPrice = totalPrice + newProduct.price * newProduct.quantity
        const updatedQty = totalQty + newProduct.quantity

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
      const productToRemove = shoppingCart.find(
        (item) => item.ProductId === productId
      )
      if (!productToRemove) return state

      const updatedCart = shoppingCart.filter(
        (item) => item.ProductId !== productId
      )
      const updatedPrice =
        totalPrice - productToRemove.price * productToRemove.qty
      const updatedQty = totalQty - productToRemove.qty

      return {
        ...state,
        shoppingCart: updatedCart,
        totalPrice: updatedPrice,
        totalQty: updatedQty
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
      const product = shoppingCart.find((item) => item.ProductId === productId)
      if (product.qty === 1) return state

      const updatedCart = shoppingCart.map((item) => {
        if (item.ProductId === productId) {
          return { ...item, qty: item.qty - 1 }
        }
        return item
      })
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
