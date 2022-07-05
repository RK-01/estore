import React, {useState, useEffect} from 'react'
import { useNavigate, useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {LinkContainer} from 'react-router-bootstrap'
import Message from '../components/Message.js'
import Loader from '../components/Loader.js'
import {Table, Container, Row, Col, Button, Image} from 'react-bootstrap'
import SellerMenu from './SellerMenu.js'
import {listProductDetails, addStoreToProduct} from '../actions/productActions'
import { storeOwnerDetails} from '../actions/storeActions'

const SellerOneProduct = () => {
    const {id}  = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

const productDetails = useSelector(state => state.productDetails)
const {loading, product, error } = productDetails
  
const storeDetailsOwner = useSelector(state => state.storeDetailsOwner)
const {loading: loadingStoreDetails, store, success, error: errorStoreDetails } = storeDetailsOwner

const userLogin = useSelector((state) => state.userLogin)
const {userInfo} = userLogin

useEffect(()=>{

    if(!userInfo){
      navigate('/login')
    }else{
      if(!store){
        dispatch(storeOwnerDetails())
        console.log(store)
      }
    }
    dispatch(listProductDetails(id))
    console.log('i am in seller store use effect')
  }, [dispatch, userInfo, success])


  const removeProductFromStoreHandler = (id) => {
  //   if(window.confirm('Are you sure to delete this product.')){
  //     dispatch(deleteProduct(id))
  // }
      
}
const addProductToStoreHandler = (e) => {
  e.preventDefault(e)
  alert(id)
  alert(store._id)
  console.log(product)
      dispatch(addStoreToProduct(id, store._id))
}
  
  return (
    <div className="seller-wrapper">
      <SellerMenu />
       <div style={{textAlign: "left"}}>
        <div>
        <Button variant='success' className='btn-sm'
                   onClick={(e) => addProductToStoreHandler(e, product._id)}>
                      Add To Store
                    </Button>
                  <Button variant='danger' className='btn-sm'
                   onClick={() => removeProductFromStoreHandler(product._id)}>
                      Remove From Store
                    </Button>
        </div>
        <img src={product.image}/>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
      
                  <Button variant='success' className='btn-sm'
                   onClick={(e) => addProductToStoreHandler(e, product._id)}>
                      Add To Store
                    </Button>
                  <Button variant='danger' className='btn-sm'
                   onClick={() => removeProductFromStoreHandler(product._id)}>
                      Remove From Store
                    </Button>
       </div> 
      
    </div>
  )
}

export default SellerOneProduct
