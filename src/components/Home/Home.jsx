import React, { useEffect, useState } from 'react'
import './Home.css'
import calidad from '../../assets/calidad.jpg'
import entregarapida from '../../assets/entregarapida.jpg'
import envio from '../../assets/envio-24hz.png'
import { Link } from 'react-router-dom'
import { db } from '../../conifg/Config' // Importa la instancia de Firestore desde tu configuración

const Home = () => {
  const [selectedProducts, setSelectedProducts] = useState([])

  useEffect(() => {
    const fetchSelectedProducts = async () => {
      try {
        const productsRef = db.collection('products') // Referencia a la colección 'products' en Firestore
        const snapshot = await productsRef.limit(3).get() // Limita la consulta a 3 productos seleccionados

        if (snapshot.empty) {
          console.log('No hay productos seleccionados disponibles.')
          return
        }

        const products = []
        snapshot.forEach((doc) => {
          products.push({ id: doc.id, ...doc.data() })
        })

        setSelectedProducts(products)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }

    fetchSelectedProducts()
  }, [])

  return (
    <div className='wrapper'>
      <div className='hero'>
        <h1 className='h1'>Bienvenidos a Nuestro E-Commerce</h1>
        <p>Encuentra los mejores productos a precios inigualables.</p>
        <Link to='/products'>
          <button className='shop-now-btn'>Compra Ahora</button>
        </Link>
      </div>

      <section className='features'>
        <div className='feature-item'>
          <img
            src={calidad}
            alt='Feature 1'
          />
          <h3>Calidad Garantizada</h3>
          <p>
            Solo los mejores productos seleccionados cuidadosamente para ti.
          </p>
        </div>
        <div className='feature-item'>
          <img
            src={entregarapida}
            alt='Feature 2'
          />
          <h3>Entrega Rápida</h3>
          <p>
            Recibe tu pedido en tiempo récord con nuestra entrega eficiente.
          </p>
        </div>
        <div className='feature-item'>
          <img
            src={envio}
            alt='Feature 3'
          />
          <h3>Soporte 24/7</h3>
          <p>
            Nuestro equipo está siempre disponible para ayudarte con cualquier
            consulta.
          </p>
        </div>
      </section>

      {/* <section className='products'>
        <h2>Productos Destacados</h2>
        <div className='product-list'>
          {selectedProducts.map((product) => (
            <div
              className='product-item'
              key={product.id}
            >
              <img
                src={product.imagen}
                alt={product.name}
              />
              <h4>{product.name}</h4>
              <p>${product.price}</p>
            </div>
          ))}
        </div>
      </section> */}
    </div>
  )
}

export default Home
