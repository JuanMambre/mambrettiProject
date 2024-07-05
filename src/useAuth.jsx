// useAuth.js
import { useEffect, useState } from 'react'
import { auth, db } from './conifg/Config' // Asegúrate de importar tu configuración correctamente
import { collection, doc, getDoc } from 'firebase/firestore'

const useAuth = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        try {
          const userRef = doc(collection(db, 'SignedUpUserData'), authUser.uid)
          const snapshot = await getDoc(userRef)
          if (snapshot.exists()) {
            setUser(snapshot.data().Name)
          }
        } catch (error) {
          console.error('Error al obtener los datos del usuario:', error)
        }
      } else {
        setUser(null)
      }
    })

    return () => unsubscribe()
  }, [])

  return user
}

export default useAuth
