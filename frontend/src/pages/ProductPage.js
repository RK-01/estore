import React, {useState, useEffect, useRef} from 'react'
import {Link, useParams} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {Row, Col, Image, ListGroup, Card, Button,Form, Container} from 'react-bootstrap'
import Loader from '../components/Loader.js'
import Message from '../components/Message.js'
import { listProductDetails, createProductReview} from '../actions/productActions.js'
import { addToCart } from '../actions/cartActions.js'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants.js'
import Rating from '../components/Rating.js'

const ProductPage = () => {
  const [qty, setQty] = useState(1);
  const [comment, setComment] = useState('')
  const [rating, setRating] = useState(0)
  const {id} = useParams();
  const dispatch = useDispatch();

  const addToCartPopup = useRef()
  
  const productDetails = useSelector(state => state.productDetails)
  const {loading, product, error } = productDetails
  
  const productCreateReview = useSelector(state => state.productCreateReview)
  const {success: successProductReview, error: errorProductReview } = productCreateReview
  
  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin

  useEffect(()=>{
   // alert(typeof id + id)
    if(successProductReview){
      alert('Review Submitted')
      setRating(0)
      setComment('')
      dispatch({type: PRODUCT_CREATE_REVIEW_RESET})
    }
    dispatch(listProductDetails(id))
   // console.log('I am from product page')
   // console.log(product)
  },[dispatch, id, successProductReview]);

  const addToCartHandler = () => {
    if(id){
      dispatch(addToCart(id, qty))
    }
    showPopup()
    setTimeout(hidePopup, 5000)
  }
  const showPopup = () => {
    addToCartPopup.current.classList.remove('add-to-cart-popup-hide')
    addToCartPopup.current.classList.add('add-to-cart-popup')
  }
  const hidePopup = () => {
    addToCartPopup.current.classList.remove('add-to-cart-popup')
    addToCartPopup.current.classList.add('add-to-cart-popup-hide')
    }
  
  const submitReviewHandler = (e) => {
    e.preventDefault()
    dispatch(createProductReview(id, {rating, comment}))
    
  }
  return (
    <Container style={{textAlign: 'left', marginBottom: '100px'}}>
      <div ref={addToCartPopup} id="cart_item_added" className="add-to-cart-popup-hide">
                  <div><Image src={product.image} alt={product.name} style={{maxWidth:"100px"}} /></div>
                  <div><strong style={{fontWeight: '900'}}>{product.name}</strong>
                  <p><strong style={{fontWeight: '900'}}>{qty} quantity</strong> added to your cart.</p>
                  </div>
      </div>
      {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>: 
      <>
      <Link className="btn btn-light my-3 border rounded" align="start" to="/">Go Back</Link>
      <Row>
        <Col key={product._id} md={4}>
            <Image src={product.image} alt={product.name} fluid/>
        </Col>
        <Col md={5}>
          <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
              </ListGroup.Item>
              <ListGroup.Item>
                MRP: Rs. <span style={{textDecoration:'line-through'}}>{product.mrp}</span>
              </ListGroup.Item>
              <ListGroup.Item>
                Discount: Rs. {product.discount}
              </ListGroup.Item>
              <ListGroup.Item>
                Price: Rs. {product.price}
              </ListGroup.Item>
              <ListGroup.Item>
                Description: {product.description}
              </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
                <ListGroup.Item>
                    <Row>
                      <Col>Price:
                      </Col>
                      <Col>
                        <strong>Rs. {product.price}</strong>
                      </Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                      <Col>Status:
                      </Col>
                      <Col>
                        <strong>{product.countInStock > 0 ? 'In Stock': 'Out of Stock'}</strong>
                      </Col>
                    </Row>
                </ListGroup.Item> 
                {product.countInStock > 0 && 
                <ListGroup.Item>
                  <Row>
                    <Col>Qty:</Col>
                    <Col>
                      <Form.Select value={qty} size="sm" onChange={(e)=>setQty(e.target.value)}>
                        {
                          [...Array(product.countInStock).keys()].map(x => {
                            return <option key={x+1} value={ x+1}>{x+1}</option>
                          })
                        }
                      </Form.Select>
                    </Col>
                  </Row>
                </ListGroup.Item>
                }
                <ListGroup.Item>
                    <Button 
                      onClick={addToCartHandler}
                      className="btn-block" 
                      type='button' 
                      disabled={product.countInStock === 0}>Add To Cart</Button>
                </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
      <Row style={{marginTop: "90px"}}>
        <Col md={6}>
          <ListGroup.Item>
              <h2>product review</h2>
              {errorProductReview && <Message>{errorProductReview}</Message>}
            {userInfo ? (
              <Form onSubmit={submitReviewHandler}>
                <Form.Group>
                  <Form.Label>Rating</Form.Label>
                  <Form.Select value={rating} onChange={(e)=>setRating(e.target.value)}>
                    <option value=''>Select</option>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group controlId="comment">
                  <Form.Label></Form.Label>
                  <Form.Control as='textarea' row='4' value={comment} placeholder='Write your review here' onChange={(e)=>setComment(e.target.value)}></Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary'>Submit Review</Button>
              </Form>
            ) : (
              <Message>
                Please <Link to="/login">Sign In</Link> to write a review
              </Message>
            )}
            </ListGroup.Item>
          {product.reviews.length === 0 && <Message>No Reviews Yet!</Message>}
          <ListGroup variant='flush'>
            {product.reviews.map(review =>(
              <ListGroup.Item key={review._id}>
                <strong>{review.name}</strong>
                <Rating value={review.rating}/>
                <p>{review.createdAt.substring(0, 10)}</p>
                <p>{review.comment}</p>
              </ListGroup.Item>
            ))}
            
          </ListGroup>
        </Col>
      </Row>
      </>
       }
    </Container>
  )
}

export default ProductPage;
