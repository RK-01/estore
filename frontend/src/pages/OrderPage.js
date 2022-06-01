import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../components/Loader.js'
import Message from '../components/Message.js'
import {Link} from 'react-router-dom'
import {Row, Col, Button, ListGroup, Image, Card, Container} from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import {getOrderDetails, deliverOrder, payOrder} from '../actions/orderActions.js'
import { ORDER_DELIVER_RESET } from '../constants/orderConstants.js'
import { removeAllItemsFromCart } from '../actions/cartActions.js'

const OrderPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {id} = useParams()
   
    const cart = useSelector(state => state.cart)
    const {cartItems} = cart

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    
    const orderDeliver = useSelector(state => state.orderDeliver)
    const {loading: loadingDeliver, success: successDeliver} = orderDeliver
    
    const orderPay = useSelector(state => state.orderPay)
    const {loading: loadingPay, success: successPay} = orderPay
    
    const orderDetails = useSelector(state => state.orderDetails)
    const {order, loading, error} = orderDetails

    useEffect(()=>{
        if(!userInfo){
            navigate('/login')
        }
        if(!order || order._id !== id){
        dispatch(getOrderDetails(id))
        }
    
        if(!order || successPay || successDeliver){
            dispatch({type:ORDER_DELIVER_RESET})
            dispatch(getOrderDetails(id))
        }else if(!order.isPaid){
            //
        }
    },[dispatch, order, id, successPay, successDeliver])

    const markAsDelivered = () => {
        dispatch(deliverOrder(order))
    }
    const successPaymentHandler = (id, paymentResult) => {
        dispatch(payOrder(id, paymentResult))
    }

    const markAsPaid = (id, paymentResult) => {
       dispatch(payOrder(id, paymentResult))
    }
    
    
  return (
    <Container style={{textAlign:'left', marginTop:"50px", marginBottom: '100px'}}>
        {loading ? (<Loader />) : error ? (<Message variant='danger'>{error}</Message>) : ( 
        <>
        <h1>Order # {order._id}</h1>
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <h2>Shipping</h2>
                    <p style={{padding: '0px', margin: '0px'}}><strong>Name: </strong>{order.user.name}</p>
                    <p style={{padding: '0px', margin: '0px'}}><strong>Email: </strong>{order.user.email}</p>
                    <p style={{padding: '0px', margin: '0px'}}><strong>Mobile: </strong>{order.user.mobile}</p>
                    <p><strong>Address: </strong>
                    {order.shippingAddress.address}, {order.shippingAddress.city},
                    {order.shippingAddress.state}, {order.shippingAddress.postalCode},  
                    {order.shippingAddress.country}
                    </p>
                </ListGroup>
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
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                </ListGroup>
                <ListGroup>
                    <h2>Payment Status</h2>
                      {order.isPaid ? (
                    
                        <ListGroup.Item style={{padding: '0px', border: '0px'}}>
                            <Message variant='success'>Order Paid on {order.paidAt.substring(0, 10)}</Message>
                        </ListGroup.Item>
                       
                       
                    )
                    :
                    (
                        <ListGroup.Item style={{padding: '0px', border: '0px'}}>
                        <Message variant='danger'>Not Paid</Message>
                        </ListGroup.Item>
                    )}  

                </ListGroup>
                <ListGroup>
                    <h2>Delivery Status</h2>
                      {order.isDelivered ? (
                        <>
                        <ListGroup.Item style={{padding: '0px', border: '0px'}}>
                            <Message variant='success'>{order.deliveryStatus} on {order.deliveredAt.substring(0, 10)}</Message>
                        </ListGroup.Item>
                       
                       </> 
                    )
                    :
                    (
                        <ListGroup.Item style={{padding: '0px', border: '0px'}}>
                        <Message variant='primary'>{order.deliveryStatus}</Message>
                        </ListGroup.Item>
                    )}  

                </ListGroup>
            </Col>
            <Col md={4}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Order Summary</h2>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Items:</Col>
                            <Col>Rs. {order.itemsPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Shipping:</Col>
                            <Col>Rs. {order.shippingPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>GST:</Col>
                            <Col>Rs. {order.taxPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Total:</Col>
                            <Col>Rs. {order.totalPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                   </ListGroup>
                <Card>

                    {!order.isPaid && (
                        <ListGroup.Item style={{padding: '0px', border: '0px', margin: '10px'}}>
                            <Button 
                                variant='flush'
                                style={{background: "#000", color: "#fff", width:"100%"}}  
                                onClick={()=>markAsPaid()}
                                >Mark as paid</Button>
                        </ListGroup.Item> 
                    )}
                    {!order.isDelivered && (
                        <ListGroup.Item style={{padding: '0px', border: '0px', margin: '10px'}}>
                            <Button 
                                variant='flush'
                                style={{background: "#000", color: "#fff", width:"100%"}}  
                                onClick={()=>markAsDelivered()}
                                >Mark as Delivered</Button>
                        </ListGroup.Item> 
                    )}
                    </Card>
            </Col>
        </Row>
      
        </>)}
        
    </Container>
  )
}

export default OrderPage
