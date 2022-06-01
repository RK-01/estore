import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../components/Loader.js'
import Message from '../components/Message.js'
import {Link} from 'react-router-dom'
import {Form, Row, Col, Button} from 'react-bootstrap'
import FormContainer from '../components/FormContainer.js'
import { useNavigate } from 'react-router-dom'
import { saveShippingAddress } from '../actions/cartActions.js'
import CheckoutSteps from '../components/CheckoutSteps.js'

const ShippingPage = () => {
    const cart = useSelector((state) => state.cart)
    const {shippingAddress} = cart

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [state, setState] = useState(shippingAddress.state)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin
  
    useEffect(()=>{
    if(!userInfo){
      navigate('/login')
    }
  }, [navigate])
  
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({address, city, state, postalCode, country}))
        navigate('/placeorder')
    }
  return (
    <FormContainer style={{textAlign:'left'}}>
      <CheckoutSteps step1 step2/>
            <h1>Shipping Address</h1>
      <Form onSubmit={submitHandler} style={{textAlign:'left', marginBottom: "100px"}}>
        <Form.Group controlId='address'>
              <Form.Label>Address</Form.Label>
            <Form.Control type="text" placeholder="Enter Address" value={address} onChange={(e)=>setAddress(e.target.value)} required></Form.Control>
        </Form.Group>

        <Form.Group controlId='city'>
              <Form.Label>City</Form.Label>
            <Form.Control type="text" placeholder="Enter City" value={city} onChange={(e)=>setCity(e.target.value)} required></Form.Control>
        </Form.Group>
        
        <Form.Group controlId='state'>
              <Form.Label>State</Form.Label>
            <Form.Control type="text" placeholder="Enter State" value={state} onChange={(e)=>setState(e.target.value)} required></Form.Control>
        </Form.Group>
        
        <Form.Group controlId='postalCode'>
              <Form.Label>PIN Code</Form.Label>
            <Form.Control type="text" placeholder="Enter Pin Code" value={postalCode} onChange={(e)=>setPostalCode(e.target.value)} required></Form.Control>
        </Form.Group>
        

        <Form.Group controlId='country'>
              <Form.Label>Country</Form.Label>
            <Form.Control type="text" placeholder="Enter Country" value={country} onChange={(e)=>setCountry(e.target.value)} required></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary">Proceed To Payment</Button>
      </Form>
    </FormContainer>
  )
}

export default ShippingPage
