import React, { useEffect } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {Row, Col, ListGroup, Image, Form, Button, Card, Container} from 'react-bootstrap'
import Message from '../components/Message.js'
import { addToCart, removeFromCart } from '../actions/cartActions.js'
import CheckoutSteps from '../components/CheckoutSteps.js'

const CartPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cart = useSelector(state => state.cart)
  const {cartItems} = cart

  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin
  
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
    if(userInfo){
      navigate('/shipping')
    }else{
      navigate('/login')
    }
  }
  return (
    <Container className="my-4">
    <Row>
      <Col md={8} style={{textAlign: 'left'}}>
         <CheckoutSteps step1/>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? <Message>Your Cart Is Empty. Start <Link to="/">here</Link></Message>: 
        (<ListGroup variant="flush">
            {cartItems.map(item=>{
                return (<ListGroup.Item key={item.product}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded/>
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>
                      Rs. {item.price}
                    </Col>
                    <Col md={2}>
                      <Form.Select value={item.qty} size="sm" onChange={(e)=>dispatch(addToCart(item.product, e.target.value))}>
                        {
                          [...Array(item.countInStock).keys()].map(x => {
                            return <option key={x+1} value={ x+1}>{x+1}</option>
                          })
                        }
                      </Form.Select>
                    
                    </Col>
                    <Col md={2}>
                      <Button type="button" variant="light" onClick={(e)=>removeFromCartHandler(item.product)}>
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
                )
            })
            }
        </ListGroup>)}
      </Col>
      <Col md={4} style={{textAlign: 'left', marginBottom: '100px'}}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>Subtotal ({cartItems.reduce((acc, item)=> acc+Number(item.qty), 0)}) items</h3>
              Rs. {cartItems.reduce((acc, item)=> acc + Number(item.qty) * item.price, 0)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button 
                type="button" 
                className="btn-block" 
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}>Proceed To Shipping</Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>

      </Row>
      </Container>
  )
}

export default CartPage
