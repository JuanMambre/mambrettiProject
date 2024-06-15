import React from 'react'
import { useState } from 'react'



const AddProduct = () => {

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [stock, setStock] = useState(0)
    const [price, setPrice] = useState(0)
    const [images, setImages] = useState([])
    const [category, setCategory] = useState('')
    const [error, setError] = useState('')
   
    const handleImageChange = (e) => {
        const files = e.target.files
        const fileArray = Array.from(files)
        const promises = fileArray.map((file) => {
          return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onloadend = () => {
              resolve(reader.result)
            }
            reader.onerror = reject
            reader.readAsDataURL(file)
          })
        })
        Promise.all(promises)
        .then((results) => {
          setImages(results)
        })
        .catch((error) => {
          setError('Error al subir las imagenes', error)
        })
    }

    const addProducts = async (e) => {
        e.preventDefault()
        setError('')
    
        try {
          const response = await fetch('/api/products', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name,
              description,
              stock,
              price,
              images,
              category
            })
          })
    
          if (response.ok) {
            router.push('/')
          } else {
            const data = await response.json()
            setError(data.message || 'Error creating the product.')
          }
        } catch (error) {
          setError('An error occurred. Please try again.')
        }
      }



  return (
    <div className='container'>
        <h2>
            AddProduct
        </h2>
        <form autoComplete='off' className='form-group' onSubmit={addProducts}>

            <label htmlFor='product-name'>Product Name</label>
                <br/>
            <input type='text' className='form-control' required onChange={(e) => setName(e.target.value)} value={name}/>

            <label htmlFor='product-price'>Product Price</label>
                <br/>
            <input type='number' className='form-control' required onChange={(e)=>setPrice(e.target.value)} value={price}/>
            
            <label htmlFor='product-price'>Product Description</label>
                <br/>
            <input type='text' className='form-control' required onChange={(e)=>setDescription(e.target.value)} value={description}/>

            <label htmlFor='product-price'>Product Category</label>
                <br/>
            <input type='text' className='form-control' required onChange={(e)=>setCategory(e.target.value)} value={category}/>
           
           <label htmlFor='product-price'>Product Stock</label>
                <br/>
            <input type='text' className='form-control' required onChange={(e)=>setStock(e.target.value)} value={stock}/>

            <label htmlFor='product-img'>Product Image</label>
                <br/>
            <input type='file' className='form-control' onChange={handleImageChange} id='file'/>
                <br/>

            <button className='btn btn-success btn-md mybtn'>ADD</button>
        </form>
        {error && <span>{error}</span>}
    </div>
  )
}

export default AddProduct;