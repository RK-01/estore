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

const AdminOneSellerOrder = () => {
    const dispatch = useDispatch()
    const {id} = useParams()
   
    const sellerOrderDetails = useSelector((state)=> state.sellerOrderDetails) 
    const { loading, error, success: successStoreDetails, order } = sellerOrderDetails
    
    useEffect(()=>{
      if(!order || order._id !== id || successStoreDetails == false){
        dispatch(getSellerOrderDetails(id))
      }
        
    },[dispatch, id, successStoreDetails])
   
    
    
  return (
    <div style={{textAlign:'left', padding: "12px", marginTop:"50px", marginBottom: '100px'}}>
        {loading ? (<Loader />) : error ? (<Message variant='danger'>{error}</Message>) : ( 
      
        <Row>
        <Col md={2}>
            <AdminMenu />
        </Col>
        
            <Col md={10}>
                <h1>Seller Order # {order._id}</h1>
        
            <ListGroup variant='flush'>
                    <h2>Order Items</h2>
                    {order.length === 0 ? <Message>Your order is empty.</Message>:
                    (
                        <ListGroup variant='flush'>
                            {order.orderItems.map(item => (
                                <ListGroup.Item key={item.product}>
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
                        </ListGroup>
                    )}
                </ListGroup>
            </Col>
        </Row>
      
        )}
        
    </div>
  )

}

export default AdminOneSellerOrder
