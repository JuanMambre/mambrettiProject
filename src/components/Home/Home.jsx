import React from 'react'
import './Home.css'
import { Link } from 'react-router-dom'

const Home = () => {
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
            src='/images/feature1.jpg'
            alt='Feature 1'
          />
          <h3>Calidad Garantizada</h3>
          <p>
            Solo los mejores productos seleccionados cuidadosamente para ti.
          </p>
        </div>
        <div className='feature-item'>
          <img
            src='/images/feature2.jpg'
            alt='Feature 2'
          />
          <h3>Entrega Rápida</h3>
          <p>
            Recibe tu pedido en tiempo récord con nuestra entrega eficiente.
          </p>
        </div>
        <div className='feature-item'>
          <img
            src='/images/feature3.jpg'
            alt='Feature 3'
          />
          <h3>Soporte 24/7</h3>
          <p>
            Nuestro equipo está siempre disponible para ayudarte con cualquier
            consulta.
          </p>
        </div>
      </section>

      <section className='products'>
        <h2>Productos Destacados</h2>
        <div className='product-list'>
          <div className='product-item'>
            <img
              src='/images/product1.jpg'
              alt='Producto 1'
            />
            <h4>Producto 1</h4>
            <p>$19.99</p>
          </div>
          <div className='product-item'>
            <img
              src='/images/product2.jpg'
              alt='Producto 2'
            />
            <h4>Producto 2</h4>
            <p>$29.99</p>
          </div>
          <div className='product-item'>
            <img
              src='/images/product3.jpg'
              alt='Producto 3'
            />
            <h4>Producto 3</h4>
            <p>$39.99</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
