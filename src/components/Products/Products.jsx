import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../conifg/Config'
import './Product.css'

const Products = () => {
  const [firebaseProducts, setFirebaseProducts] = useState([])
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const category = searchParams.get('category')

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(db, 'products')
        let productsQuery = query(productsCollection)

        if (category) {
          productsQuery = query(
            productsCollection,
            where('category', '==', category)
          )
        }

        const productsSnapshot = await getDocs(productsQuery)
        const productsData = productsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))
        setFirebaseProducts(productsData)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }

    fetchProducts()
  }, [category])

  return (
    <>
      <h1>Products</h1>
      <div className='products-container'>
        {firebaseProducts.length === 0 && <div>Loading...</div>}
        {firebaseProducts.map((p) => (
          <Link
            to={`/product/${p.id}`}
            key={p.id}
          >
            <div
              className='product-card'
              key={p.img}
            >
              <div className='product-img'>
                <img
                  src={p.imagen}
                  alt='not found'
                  className='imagen1'
                />
              </div>
              <div className='product-name'>{p.name}</div>
              <div className='product-price'>${p.price}</div>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}

export default Products
