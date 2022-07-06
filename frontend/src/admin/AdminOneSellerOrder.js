import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../components/Loader.js'
import Message from '../components/Message.js'
import {Link} from 'react-router-dom'
import {Table, Row, Col, Button, ListGroup, Image, Card, Container, Form, FormGroup, FormSelect} from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import {getSellerOrderDetails} from '../actions/sellerOrderActions.js'
import AdminMenu from './AdminMenu.js'
import {listStoreDetails} from '../actions/storeActions'

const AdminOneSellerOrder = () => {
    const [store, setStore] = useState('')
    const dispatch = useDispatch()
    const {id} = useParams()
    const navigate = useNavigate()
    
    const sellerOrderDetails = useSelector((state)=> state.sellerOrderDetails) 
    const { loading, error, success, order } = sellerOrderDetails
    
    const userLogin = useSelector((state) => state.userLogin)
    const {userInfo} = userLogin

  useEffect(()=>{
    if(!userInfo.isAdmin){
      navigate('/login')
    }else{
      dispatch(getSellerOrderDetails(id))
    }
  },[dispatch, userInfo, navigate])

    
    
  return (
    <div style={{textAlign:'left', padding: "12px", marginTop:"50px", marginBottom: '100px'}}>
        {loading ? (<Loader />) : error ? (<Message variant='danger'>{error}</Message>) : ( 
      <Row>
         <Col md={2}>
            <AdminMenu />
        </Col>
       
      {order && (
        <Col md={10}>
        <h1>Seller Order # {order._id}</h1>
        <p><strong>Order Total: </strong>{order.itemsPrice}</p>
        {order.orderItems.map((item, index) => (
                                <ListGroup.Item key={item.product + index}>
                                    <Row>
                                        <Col md={1}>
                                            <Image src={item.image} alt={item.name} fluid rounded/>
                                        </Col>
                                        <Col>
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        </Col>
                                        <Col md={4}>{item.qty} x Rs. {item.price} =  Rs. {item.qty*item.price}</Col>
                                       <Col>Current Status</Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                            <Button>Initiate Settlement</Button>
        </Col>
      )}
      </Row>
      )}
        
    </div>
  )

}

export default AdminOneSellerOrder
