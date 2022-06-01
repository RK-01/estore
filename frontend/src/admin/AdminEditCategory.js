import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {Link, useParams, useNavigate} from 'react-router-dom'
import {Form, Button} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { listCategoryDetails, updateCategory } from '../actions/categoryActions'
import { CATEGORY_UPDATE_RESET } from '../constants/categoryConstants'

const AdminEditCategory = () => {
  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [uploading, setUploading] = useState(false)

  const {id} = useParams()
  const navigate = useNavigate()
  
  const dispatch = useDispatch()

  const categoryDetails = useSelector(state => state.categoryDetails)
  const {loading, category, error } = categoryDetails
  
  const categoryUpdate = useSelector(state => state.categoryUpdate)
  const {loading:loadingUpdate, success:successUpdate, error:errorUpdate } = categoryUpdate
  
  useEffect(()=>{
    if(successUpdate){
      dispatch({type:CATEGORY_UPDATE_RESET})
      navigate('/admin-categories')
    }else{
      if(!category.name || category._id !== id){
      dispatch(listCategoryDetails(id))
    }else{
      setName(category.name)
      setImage(category.image)
      }
    }
    
  },[dispatch, navigate, id, category._id, successUpdate])

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
      dispatch(updateCategory({
        _id:id,name,image
      }))
  }

  return (
    <>
    <Link to='/admin-categories' className='btn btn-light my-3'>Go Back</Link>
    <FormContainer>
      <h1>Edit Category</h1>
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
          <Button type="submit" variant='primary' className="btn btn-block">Update</Button>
        </Form.Group>
      </Form>
    </FormContainer>
    </>
  )
}

export default AdminEditCategory
