import React, {useEffect, useState} from 'react'
import { useNavigate, useParams, Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {LinkContainer} from 'react-router-bootstrap'
import Message from '../components/Message.js'
import Loader from '../components/Loader.js'
import {Form, Table, Container, Row, Col, Button, Image} from 'react-bootstrap'
import { storeOwnerDetails, updateStore, createStore } from '../actions/storeActions'
import FormContainer from '../components/FormContainer'
import { STORE_UPDATE_RESET } from '../constants/storeConstants'
import SellerMenu from './SellerMenu'

const SellerDashboard = () => {
  const [uploading, setUploading] = useState(false)

  const storeCreate = useSelector((state)=> state.storeCreate) 
  const { loading: loadingCreate, error: errorCreate, success: successCreate, store: createdStore } = storeCreate

  const storeDetailsOwner = useSelector(state => state.storeDetailsOwner)
  const {loading, store, success, error } = storeDetailsOwner

  const userLogin = useSelector((state) => state.userLogin)
  const {userInfo} = userLogin

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const createStoreHandler = () => {
    dispatch(createStore())
  }
  
  
  useEffect(()=>{
    if(userInfo){
      if(!store){
        dispatch(storeOwnerDetails())
    }
    
    }else{
      navigate('/login')
    }
    console.log(store)
    //console.log('i am in seller dashboard use effect')
  }, [dispatch, successCreate, success])
  return (
    <div className="seller-wrapper">
    <SellerMenu />  
    <div className="rk-hero seller-main">
      {store ? <>Dashboard</> : <>
        <div className="container">
    <h1 className="display-4">Welcome to pet-care</h1>
    <p className="lead"> 
      Starting your own online business is easy with us. Create a store to get started. 
      </p>
  <Button className='my-3 rounded' variant="success" onClick={createStoreHandler}>
                  <i className='fas fa-plus'></i> Create Store
              </Button>
          
  </div>
      </>}
  
</div>
    

        </div>

  )
}

export default SellerDashboard
