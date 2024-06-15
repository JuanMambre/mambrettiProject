import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './NavBar.css'
import logo from '../../assets/react.svg'
import { cart } from 'react-icons-kit/entypo/cart'
import { Icon } from 'react-icons-kit'
import { auth, db } from '../../conifg/Config'
import { collection, getDocs } from 'firebase/firestore'

const Navbar = ({ user }) => {
  const navigate = useNavigate()
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesSet = new Set()
        const productsSnapshot = await getDocs(collection(db, 'products'))
        productsSnapshot.forEach((doc) => {
          const product = doc.data()
          if (product.category) {
            categoriesSet.add(product.category)
          }
        })
        setCategories(Array.from(categoriesSet))
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }

    fetchCategories()
  }, [])

  const handleLogout = () => {
    auth.signOut().then(() => {
      navigate('/login')
    })
  }

  const handleCategorySelect = (category) => {
    navigate(`/products?category=${category}`)
  }

  return (
    <div className='navbox'>
      <div className='leftside'>
        <Link to='/'>
          <img
            src={logo}
            alt='React Logo'
          />
        </Link>
      </div>
      <div className='rightside'>
        <div className='dropdown'>
          <button className='dropdown-button'>
            <Link
              to='/products'
              className='navlinks'
            >
              Products
            </Link>
          </button>
          <div className='dropdown-content'>
            {categories.map((category) => (
              <button
                key={category}
                className='dropdown-item'
                onClick={() => handleCategorySelect(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        {!user ? (
          <>
            <Link
              to='/signup'
              className='navlinks'
            >
              SignUp
            </Link>
            <Link
              to='/login'
              className='navlinks'
            >
              SignIn
            </Link>
          </>
        ) : (
          <>
            <span className='navlinks'>
              <Link
                to='/'
                className='navlinks'
              >
                {user}
              </Link>
            </span>
            <span className='navlinks'>
              <Link
                to='/cart'
                className='navlinks'
              >
                <Icon icon={cart} />
              </Link>
            </span>
            <span>
              <button
                className='logout-btn'
                onClick={handleLogout}
              >
                Log Out
              </button>
            </span>
          </>
        )}
      </div>
    </div>
  )
}

export default Navbar
