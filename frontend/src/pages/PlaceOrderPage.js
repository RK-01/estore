import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../components/Loader.js'
import Message from '../components/Message.js'
import {Link} from 'react-router-dom'
import {Row, Col, Button, ListGroup, Image, Form, Container} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import CheckoutSteps from '../components/CheckoutSteps.js'
import {createOrder, myUnpaidOrdersList} from '../actions/orderActions.js'
import axios from 'axios'
import { removeAllItemsFromCart } from '../actions/cartActions.js'

const PlaceOrderPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [paymentMethod, setPaymentMethod] = useState('Razorpay')
    const cart = useSelector(state => state.cart)
    
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin
     
    //check for any previous unpaid orders
    const orderMyUnpaidList = useSelector(state=> state.orderMyUnpaidList)
    const {orders:unpaidOrders, loading, error:errorUnpaidOrder} = orderMyUnpaidList

   useEffect(()=>{
       dispatch(myUnpaidOrdersList())
    if(!userInfo){
      navigate('/login')
    }
  }, [navigate, dispatch])   

    const addDecimals = (num) => {
        return (Math.round(num * 100)/100).toFixed(2)
    }
    cart.itemsPrice = addDecimals(cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0))
    cart.shippingPrice = addDecimals(cart.itemsPrice <= 999 ? 40 : 0)
    cart.taxPrice = addDecimals(Number((0.12 * cart.itemsPrice)).toFixed(2)) 
    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice))
    
    
        const selectPaymentMethod = (e) => {
            setPaymentMethod(e.target.value)
        }

const orderCreate = useSelector(state => state.orderCreate)
            const {order, success, error} = orderCreate

// async function confirmOrder() {
//    console.log(unpaidOrders)
//     if(unpaidOrders.length === 0){
//                 // console.log(order._id)
//                     if(success){navigate(`/order/${order._id}`)}
//     }else{
//                      navigate('/myorders/?unpaid=true')
//          }
//   }
  const loadScript = async (src) => {

        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
}

async function handleRazorpay() {
        //console.log(order)
        //alert(typeof cart.totalPrice + cart.totalPrice.toFixed(2))
        const {data} = await axios.post("/api/payment/orders", {amount: cart.totalPrice.toFixed(2)});
        console.log(data)

        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }
        
        const options = {
            key: "rzp_test_o6IPyO4rIphXzZ", // Enter the Key ID generated from the Dashboard
            amount: data.data.amount,
            currency: data.data.currency,
            name: "Bykree InfoTech",
            description: "Test Transaction",
            image: '',
            order_id: data.data.id,
            handler: async (response)=> {
                try{
                    const {data} = await axios.post("/api/payment/verify", response)
                    console.log(data)
                    const paymentResult = {
                            paymentOrderId: response.razorpay_order_id, 
                            payment_id: response.razorpay_payment_id,
                            signature: response.razorpay_signature,
                            update_time: Date.now() 
                            }
                //     const successData = {
                //     razorpayPaymentId: response.razorpay_payment_id,
                //     razorpayOrderId: response.razorpay_order_id,
                //     razorpaySignature: response.razorpay_signature,
                // };
                // console.log(successData)
                // const {updatedOrder} = await axios.put(`/api/payment/updateOrder/${order._id}`, successData);
                 dispatch(createOrder({
                        orderItems: cart.cartItems,
                        shippingAddress: cart.shippingAddress,
                        paymentMethod: cart.paymentMethod,
                        itemsPrice: cart.itemsPrice,
                        shippingPrice: cart.shippingPrice,
                        taxPrice: cart.taxPrice,
                        totalPrice: cart.totalPrice,
                        paymentResult : paymentResult,
                        isPaid: true,
                        paidAt: Date.now()
                    }))
       
                dispatch(removeAllItemsFromCart())
                cart.shippingPrice = 0
                navigate(`/myorders`)
                }catch(error){
                        console.log(error)
                }
            },
            prefill: {
                name: "Rashid Khan",
                email: "khan_rashid01@rediffmail.com",
                contact: "9971349002",
            },
            notes: {
                address: "Bykree InfoTech",
            },
            theme: {
                color: "#61dafb",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
}     

  return (
    <Container style={{textAlign:'left', marginTop: "50px"}}>
        <CheckoutSteps step1 step2 step3/>
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <h2>Shipping</h2>
                    <p><strong>Address: </strong>
                    {cart.shippingAddress.address}, {cart.shippingAddress.city},
                    {cart.shippingAddress.state}, {cart.shippingAddress.postalCode},  
                    {cart.shippingAddress.country}
                    </p>
                </ListGroup>

                <ListGroup variant='flush'>
                    <h2>Order Items</h2>
                    {cart.length === 0 ? <Message>Your cart is empty.</Message>:
                    (
                        <ListGroup variant='flush'>
                            {cart.cartItems.map(item => (
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
            </Col>
            <Col md={4}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Order Summary</h2>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Items:</Col>
                            <Col>Rs. {cart.itemsPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Shipping:</Col>
                            <Col>Rs. {cart.shippingPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>GST:</Col>
                            <Col>Rs. {cart.taxPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Total:</Col>
                            <Col>Rs. {cart.totalPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                       <Form>
        <Form.Group controlId='payment'>
              <h2 as='legend'>Payment Method</h2>
        <Col>
            <Form.Check 
                type='radio' 
                label='Razorpay' 
                id='razorpay' 
                name="paymentMethod" 
                value='Razorpay' 
                checked
                onChange={()=>selectPaymentMethod()}>
            </Form.Check>
        </Col>
        </Form.Group>
   

        </Form>
             </ListGroup.Item>
                    <ListGroup.Item>
                        <Button className='btn-block' style={{width: "100%", fontSize: "1.5rem", background: '#690fad', borderRadius: "10px"}} disabled={cart.cartItems === 0} onClick={()=>handleRazorpay()}>Confirm Order & Pay</Button>
                    </ListGroup.Item>
                </ListGroup>
                
            </Col>
        </Row>
      
    </Container>
  )
}

export default PlaceOrderPage
