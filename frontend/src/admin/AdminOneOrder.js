import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../components/Loader.js'
import Message from '../components/Message.js'
import {Link} from 'react-router-dom'
import {Row, Col, Button, ListGroup, Image, Card, Container, Form, FormGroup, FormSelect} from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import {getOrderDetails, deliverOrder, payOrder} from '../actions/orderActions.js'
import { ORDER_DELIVER_RESET } from '../constants/orderConstants.js'
import { removeAllItemsFromCart } from '../actions/cartActions.js'
import { STORE_STATUS_REQUEST} from '../constants/storeConstants.js'
import { listStores} from '../actions/storeActions.js'
import AdminMenu from './AdminMenu.js'
import {createSellerOrder} from '../actions/sellerOrderActions.js'

const AdminOneOrder = () => {
    const [sellerItems, setSellerItems] = useState([])
    const [store, setStore] = useState('')
    const [customerOrder, setCustomerOrder] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {id} = useParams()
   
    //cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    // cart.shippingPrice = addDecimals(cart.itemsPrice <= 999 ? 40 : 0)
    // cart.taxPrice = addDecimals(Number((0.12 * cart.itemsPrice)).toFixed(2)) 
    // cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice))
    
    const sellerItemsPrice = sellerItems.reduce((acc, item)=> acc + item.price * item.qty, 0)
    const shippingCost = 19
    const taxPrice = Number((0.12 * sellerItemsPrice)).toFixed(2)
    const totalPrice = Number(sellerItemsPrice) + Number(shippingCost) + Number(taxPrice)
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const storeList = useSelector((state)=> state.storeList) 
  const { loading: loadingStoreList, success: successStoreList, error: errorStoreList, stores } = storeList

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
            dispatch(listStores())
            console.log(stores)
         }
    
        if(!order || successPay || successDeliver){
            dispatch({type:ORDER_DELIVER_RESET})
            dispatch(getOrderDetails(id))
           
        }else if(!order.isPaid){
            //
        }
       
    },[dispatch, order, id, successPay, successDeliver, successStoreList])

    const markAsDelivered = () => {
        dispatch(deliverOrder(order))
    }
    const successPaymentHandler = (id, paymentResult) => {
        dispatch(payOrder(id, paymentResult))
    }

    const markAsPaid = (id, paymentResult) => {
       dispatch(payOrder(id, paymentResult))
    }
    const placeSellerOrder = () => {
           dispatch(createSellerOrder({
            store: store,
            customerOrderId: order._id,
            orderItems: sellerItems,
            itemsPrice: sellerItemsPrice,
            shippingCost: shippingCost,
            taxPrice: taxPrice,
            totalPrice: totalPrice
            }))
        }

const addProductToSellerOrder = (item) => {
    setSellerItems(sellerItems => [...sellerItems, item])
    console.log(sellerItems)
}
const removeProductFromSellerOrder = (item) =>{
    //remove product from seller order
    let newItems = sellerItems.filter(i => i._id !== item._id);
    setSellerItems(newItems);
  
}
const selectStoreInput = (e) => {
    alert('i am trying to change stroe input')
    console.log(e.target.value)
    setStore(e.target.value)
}
  return (
    <div style={{textAlign:'left', padding: "12px", marginTop:"50px", marginBottom: '100px'}}>
        {loading ? (<Loader />) : error ? (<Message variant='danger'>{error}</Message>) : ( 
        <>
        <Row>
        <Col md={1}>
            <AdminMenu />
        </Col>
        
            <Col md={7}>
                <h1>Admin Order # {order._id}</h1>
        
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
                                        <Col><Button onClick={()=>addProductToSellerOrder(item)}><i className="fa fa-plus"></i></Button></Col>
                                     <Col>Current Status</Col>
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
                    <div className="place-order-to-store"><h3>Place Order To Seller</h3>
                    <Form>
                        <FormGroup>
                            <FormSelect onChange={selectStoreInput}>
                                <option value=''>Select Store</option>
                                {stores && <>
                                {stores.map(store => {
                                    return (
                                        <option key={store._id} value={store._id}>{store.name}</option>
                                    )
                                })}
                                
                                </>}
                                
                            </FormSelect>
                        </FormGroup>
                    </Form>
                    Items to Order
                    {sellerItems.length === 0 ? <Message>Your order is empty.</Message>:
                    (
                        <ListGroup variant='flush'>
                            {sellerItems.map((item, index) => (
                                <ListGroup.Item key={item.product + "_" + index}>
                                    <Row>
                                        <Col md={1}>
                                            <Image src={item.image} alt={item.name} style={{width:"64px"}}/>
                                        </Col>
                                        <Col>
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        </Col>
                                        <Col md={4}>{item.qty} x Rs. {item.price} =  Rs. {item.qty*item.price}</Col>
                                        <Col><Button variant="danger" onClick={()=>removeProductFromSellerOrder(item)}><i className="fa fa-times"></i></Button></Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                    <Button onClick={placeSellerOrder}>Place Seller Order</Button>
                    </div>
            </Col>
        </Row>
      
        </>)}
        
    </div>
  )
}

export default AdminOneOrder
