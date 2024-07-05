// App.jsx
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css'
import AuthListener from './authListener' // Importa el componente AuthListener

function App() {
  return (
    <Router>
      <AuthListener />
    </Router>
  )
}

export default App
