import React, {useState, useEffect, useRef} from 'react'
import {Link, useParams} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {Row, Col, Image, ListGroup, Card, Button,Form, Container} from 'react-bootstrap'
import Loader from '../components/Loader.js'
import Message from '../components/Message.js'
import { listProductDetails} from '../actions/productActions.js'
import Rating from '../components/Rating.js'

const ProductCardItem = ({productId, categoryName}) => {
  const dispatch = useDispatch();
  const id = productId;
  const productDetails = useSelector(state => state.productDetails)
  const {loading, product, error } = productDetails
    
  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin

  useEffect(()=>{
    alert(typeof id+ id)
dispatch(listProductDetails(id))
     console.log('I am from home page/ productcard item component')
    console.log(product)
  },[dispatch, id]);

  return (
      <Card key={product._id}>
        <p>{categoryName}</p>
          {product._id}       
          <Link to={`/product/${product._id}`}>
          {product ? <p>{product._id}</p> : <></>}
      {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>: 
    
        <div key={product._id}>
            <Image src={product.image} alt={product.name} fluid/>
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
              </ListGroup>
      </div>
       }
       </Link>
       </Card>
  )
  
}

export default ProductCardItem;
