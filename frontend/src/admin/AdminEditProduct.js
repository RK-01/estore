import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {Link, useParams, useNavigate} from 'react-router-dom'
import {Form, Button} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { listProductDetails, updateProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'
import { listCategories } from '../actions/categoryActions'

const AdminEditProduct = () => {
  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [mrp, setMrp] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [description, setDescription] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [brand, setBrand] = useState('')
  const [uploading, setUploading] = useState(false)

  const {id} = useParams()
  const navigate = useNavigate()
  
  const dispatch = useDispatch()

  const productDetails = useSelector(state => state.productDetails)
  const {loading, product, error } = productDetails
  
  const productUpdate = useSelector(state => state.productUpdate)
  const {loading:loadingUpdate, success:successUpdate, error:errorUpdate } = productUpdate
  
  useEffect(()=>{
    dispatch(listCategories())
    if(successUpdate){
      dispatch({type:PRODUCT_UPDATE_RESET})
      navigate('/admin-products')
    }else{
      if(!product.name || product._id !== id){
      dispatch(listProductDetails(id))
    }else{
      setName(product.name)
      setMrp(Number(product.mrp))
      setDiscount(Number(product.discount))
      setImage(product.image)
      setDescription(product.description)
      setBrand(product.brand)
      setCountInStock(product.countInStock)
    }
    }
    
  },[dispatch, navigate, id, product._id, successUpdate])

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      const {data}= await axios.post('/api/upload', formData, config)
      console.log(data)
      setImage(data)
      setUploading(false)
    } catch (error) {
      console.log(error)
      setUploading(false)
      
    }
  }
  
  const submitHandler = (e) => {
      e.preventDefault()
      dispatch(updateProduct({
        _id:id,name,image, mrp, discount, brand, description, countInStock
      }))
  }

  return (
    <>
    <Link to='/admin-products' className='btn btn-light my-3'>Go Back</Link>
    <FormContainer>
      <h1>Edit Product</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label>Image</Form.Label>
          <Form.Control 
              type="text"
              placeholder='Enter Image'
              value={image}
              onChange={(e)=>setImage(e.target.value)}></Form.Control>
              <Form.Control
                type="file" 
                id='image-file' 
                label='Choose File' 
                custom
                onChange={uploadFileHandler}>
              </Form.Control>
              {uploading && <Loader/>}
        </Form.Group>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control 
              type="text"
              placeholder='Enter Name'
              value={name}
              onChange={(e)=>setName(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control 
              type="text"
              placeholder='Enter Description'
              value={description}
              onChange={(e)=>setDescription(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Brand Name</Form.Label>
          <Form.Control 
              type="text"
              placeholder='Enter Brand Name'
              value={brand}
              onChange={(e)=>setBrand(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>MRP</Form.Label>
          <Form.Control 
              type="number"
              placeholder='Enter MRP'
              value={mrp}
              onChange={(e)=>setMrp(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Discount</Form.Label>
          <Form.Control 
              type="number"
              placeholder='Enter Discount'
              value={discount}
              onChange={(e)=>setDiscount(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='countInStock'>
          <Form.Label>Current Stock</Form.Label>
          <Form.Control 
              type="number"
              placeholder='Enter Stock'
              value={countInStock}
              onChange={(e)=>setCountInStock(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group>
          <Button type="submit" variant='primary' className="btn btn-block">Update</Button>
        </Form.Group>
      </Form>
    </FormContainer>
    </>
  )
}

export default AdminEditProduct
