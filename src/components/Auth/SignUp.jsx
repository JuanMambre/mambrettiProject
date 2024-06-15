import React, { useState } from 'react'
import { auth, db } from '../../conifg/Config' // Asegúrate de tener la configuración correcta
import { Link, useNavigate } from 'react-router-dom' // useNavigate para la navegación
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore' // Importar doc y setDoc de firestore

const SignUp = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate() // useNavigate hook para navegación

  const signUp = async (e) => {
    e.preventDefault()
    try {
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      const userUid = credentials.user.uid

      await setDoc(doc(db, 'SignedUpUserData', userUid), {
        Name: name,
        Email: email,
        Password: password // Por razones de seguridad, no almacenes la contraseña en texto claro
      })

      setName('')
      setEmail('')
      setPassword('')
      setError('')
      navigate('/login') // Navega a la página de inicio de sesión
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className='container'>
      <br />
      <h2>SignUp</h2>
      <hr />
      <form
        autoComplete='off'
        className='form-group'
        onSubmit={signUp}
      >
        <label htmlFor='Name'>Name</label>
        <br />
        <input
          type='text' // Corregido aquí
          className='form-control'
          required
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <br />
        <label htmlFor='Email'>Email</label>
        <br />
        <input
          type='email' // Corregido aquí
          className='form-control'
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <br />
        <label htmlFor='Password'>Password</label>
        <br />
        <input
          type='password' // Corregido aquí
          className='form-control'
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <br />
        <button
          type='submit'
          className='btn btn-success btn-md mybtn'
        >
          Register
        </button>
      </form>
      {error && <div className='error-msg'>{error}</div>}
      <br />
      <span>Already have an account? Log in </span>
      <Link to='/login'>Here</Link> {/* Corregido el enlace */}
    </div>
  )
}

export default SignUp
