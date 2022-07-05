import React, {useEffect, useState} from 'react'
import { useNavigate, useParams, Link, Navigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {LinkContainer} from 'react-router-bootstrap'
import Message from '../components/Message.js'
import Loader from '../components/Loader.js'
import {Form, Table, Container, Row, Col, Button, Image} from 'react-bootstrap'
import { listStoreDetails, updateStore } from '../actions/storeActions'
import FormContainer from '../components/FormContainer'
import { STORE_UPDATE_RESET } from '../constants/storeConstants'
import SellerMenu from './SellerMenu'

const SellerStoreEdit = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [gstn, setGstn] = useState('')
  const [pan, setPan] = useState('')
  const [dl, setDl] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity]  = useState('')
  const [state, setState] = useState('')
  const [country, setCountry]= useState('')
  const [pincode, setPincode] = useState('')
  
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin)
  const {userInfo} = userLogin

  const storeDetails = useSelector(state => state.storeDetails)
  const {loading, store, error } = storeDetails
  
  const storeUpdate = useSelector(state => state.storeUpdate)
  const {loading:loadingUpdate, success:successUpdate, error:errorUpdate } = storeUpdate
  
  const {id} = useParams();
  const navigate = useNavigate();

  const updateHandler = (e) => {
      e.preventDefault()
      dispatch(updateStore({
        _id:id, name,description, gstn, pan, dl, address, city, state, pincode, country
      }))
  }

  useEffect(()=>{
    if(successUpdate){
      dispatch({type:STORE_UPDATE_RESET})
      navigate('/seller-store')
    }else{
      if(!store.name || store._id !== id){
      dispatch(listStoreDetails(id))
    }else{
      if(store.status === true){
        navigate('/seller-store')
      }else if(store.status === false){
      setName(store.name)
      setDescription(store.description)
      setGstn(store.gstn)
      setPan(store.pan)
      setDl(store.dl)
      setAddress(store.address)
      setCity(store.city)
      setState(store.state)
      setPincode(store.pincode)
      setCountry(store.country)
      setDl(store.dl)
      }
      }
    }
  },[dispatch, navigate, id, store._id, successUpdate])

  return (
    <div className="seller-wrapper">
      <SellerMenu />
      
      <div className="container my-3" style={{maxWidth: "600px"}}>
      
      {store.status === false && <>
      <h4>We are excited to have you on board. Please fill the details below to get started.</h4>

      <Form onSubmit={updateHandler} style={{textAlign: "left"}}>
        <Form.Group as={Row}>
          <Form.Label>Firm Name</Form.Label>
          <Form.Control 
              type="text"
              placeholder='Enter Name'
              value={name}
              onChange={(e)=>setName(e.target.value)}
              ></Form.Control>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label>Description</Form.Label>
          <Form.Control 
              type="text"
              placeholder='Enter Short Description'
              value={description}
              onChange={(e)=>setDescription(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label>GSTN</Form.Label>
          <Form.Control 
              type="text"
              placeholder='Enter GSTN'
              value={gstn}
              onChange={(e)=>setGstn(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label>PAN</Form.Label>
          <Form.Control 
              type="text"
              placeholder='Enter PAN'
              value={pan}
              onChange={(e)=>setPan(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label>DL (optional)</Form.Label>
          <Form.Control 
              type="text"
              placeholder='Enter DL'
              value={dl}
              onChange={(e)=>setDl(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label>Address</Form.Label>
          <Form.Control 
              type="text"
              placeholder='Enter Address'
              value={address}
              onChange={(e)=>setAddress(e.target.value)}></Form.Control>
        </Form.Group>
        
        <Form.Group as={Row}>
          <Form.Label>City</Form.Label>
          <Form.Control 
              type="text"
              placeholder='Select City'
              value={city}
              onChange={(e)=>setCity(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label>State</Form.Label>
          <Form.Control 
              type="text"
              placeholder='Select State'
              value={state}
              onChange={(e)=>setState(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label>Pin Code</Form.Label>
          <Form.Control 
              type="text"
              placeholder='Enter Pincode'
              value={pincode}
              onChange={(e)=>setPincode(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label>Country</Form.Label>
          <Form.Control 
              type="text"
              placeholder='Select Country'
              value={country}
              onChange={(e)=>setCountry(e.target.value)}></Form.Control>
        </Form.Group>
        
        <Form.Group as={Row}>
          <Button type="submit" variant='success' className="btn btn-block">Update</Button>
        </Form.Group>
      </Form>

      </>}
          </div>

    </div>
      )
}

export default SellerStoreEdit
