import { db } from '../../conifg/Config'
import {
  collection,
  doc,
  getDocs,
  setDoc,
  serverTimestamp
} from 'firebase/firestore'

const productsRef = collection(db, 'products')

const products = async (req, res) => {
  if (req.method === 'GET') {
    const snapshot = await getDocs(productsRef)
    const products = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    res.status(200).json(products)
  } else if (req.method === 'POST') {
    try {
      const { name, description, stock, price, images, category } = req.body
      const newProductRef = doc(productsRef)
      const newProduct = {
        name,
        description,
        stock,
        price,
        images,
        category,
        createdAt: serverTimestamp()
      }
      await setDoc(newProductRef, newProduct)
      res.status(201).json({ id: newProductRef.id, ...newProduct })
    } catch (error) {
      console.error('Error creating product: ', error)
      res.status(500).json({ message: 'Error creating product' })
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

export default products