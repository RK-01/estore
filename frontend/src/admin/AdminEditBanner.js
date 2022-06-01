import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {Link, useParams, useNavigate} from 'react-router-dom'
import {Form, Button} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { listBannerDetails, updateBanner } from '../actions/bannerActions'
import { BANNER_UPDATE_RESET } from '../constants/bannerConstants'

const AdminEditBanner = () => {
  const [image, setImage] = useState('')
  const [status, setStatus] = useState(0)
  const [uploading, setUploading] = useState(false)

  const {id} = useParams()
  const navigate = useNavigate()
  
  const dispatch = useDispatch()

  const bannerDetails = useSelector(state => state.bannerDetails)
  const {loading, banner, error } = bannerDetails
  
  const bannerUpdate = useSelector(state => state.bannerUpdate)
  const {loading:loadingUpdate, success:successUpdate, error:errorUpdate } = bannerUpdate
  
  useEffect(()=>{
    console.log(banner)
    if(successUpdate){
      dispatch({type:BANNER_UPDATE_RESET})
      navigate('/admin-banners')
    }else{
      if(banner._id !== id){
      dispatch(listBannerDetails(id))
    }else{
      setStatus(banner.status)
      setImage(banner.image)
}
    }
    
  },[dispatch, navigate, id, banner._id, successUpdate])

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
      dispatch(updateBanner({
        _id:id,image, status
      }))
  }

  return (
    <>
    <Link to='/admin-banners' className='btn btn-light my-3'>Go Back</Link>
    <FormContainer>
      <h1>Edit Banner</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label>Image</Form.Label>
            <Form.Control 
              type="text"
              placeholder='Enter Image'
              value={image}
              onChange={(e)=>setImage(e.target.value)}>
              </Form.Control>
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
          <Form.Label>Status</Form.Label>
          <Form.Control 
              type="number"
              placeholder='Enter Status'
              value={status}
              onChange={(e)=>setStatus(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group>
          <Button type="submit" variant='primary' className="btn btn-block">Update</Button>
        </Form.Group>
      </Form>
    </FormContainer>
    </>
  )
}

export default AdminEditBanner
