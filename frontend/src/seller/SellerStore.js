import React, {useEffect, useState} from 'react'
import { useNavigate, useParams, Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {LinkContainer} from 'react-router-bootstrap'
import Message from '../components/Message.js'
import Loader from '../components/Loader.js'
import {Form, Table, Container, Row, Col, Button, Image} from 'react-bootstrap'
import { storeOwnerDetails} from '../actions/storeActions'
import FormContainer from '../components/FormContainer'
import { STORE_UPDATE_RESET } from '../constants/storeConstants'
import SellerMenu from './SellerMenu'

const SellerStore = () => {

const dispatch = useDispatch();

const navigate = useNavigate();

const storeDetailsOwner = useSelector(state => state.storeDetailsOwner)
const {loading, store, success, error } = storeDetailsOwner

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
    console.log('i am in seller store use effect')
  }, [dispatch, userInfo, success])
  
  return (
    <div className="seller-wrapper">
        <SellerMenu />
        <div className="seller-main container">
          <h4>We are excited to have you on board. Please submit your store information by using edit button.</h4>
      {store && <>
        {store.status === true ? <></> : <Link to={`/store/${store._id}/edit`}>Edit</Link>}  
        
      
      <div style={{textAlign: "left", padding: "22px"}}>
      <p><strong>Name: </strong>{store.name}</p>
      <p><strong>Description: </strong>{store.description}</p>
      <p><strong>GSTN: </strong>{store.gstn}</p>
      <p><strong>PAN: </strong>{store.pan}</p>
      <p><strong>DL (Optional): </strong>{store.dl}</p>
      <p><strong>Address: </strong>{store.address}</p>
      <p><strong>City: </strong>{store.city}</p>
      <p><strong>State: </strong>{store.state}</p>
      <p><strong>Pincode: </strong>{store.pincode}</p>
      <p><strong>Country: </strong>{store.country}</p>
      <h4><strong>Status: </strong>{store.status === true ? <div className="store-approved">Approved</div> : <div className="store-pending-approval">Not Yet Approved</div>}</h4>
    </div>
    
      </>
      }
      
        </div>  
    </div>
  )
}

export default SellerStore
