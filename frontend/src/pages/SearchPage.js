import React, {useState, useEffect, useRef} from 'react'
import {Link, useParams} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {Row, Col, Image, ListGroup, Card, Button,Form, Container} from 'react-bootstrap'
import Loader from '../components/Loader.js'
import Message from '../components/Message.js'
import { searchProducts} from '../actions/productActions.js'
import { addToCart } from '../actions/cartActions.js'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants.js'
import Rating from '../components/Rating.js'

const SearchPage = () => {
    const {keyword} = useParams();
    const dispatch = useDispatch();

    const searchProductList = useSelector(state => state.searchProductList)
    const {loading, products, error} = searchProductList
    useEffect(()=>{
        dispatch(searchProducts(keyword))
        console.log(products)
    },[keyword])
  return (
    <Container fluid>
        
        <Row style={{padding: "44px 0px"}}>
          {loading && <Loader />}
          {products.length > 0 ? <h1 style={{padding: "44px 0px"}}>You have {products.length} result for <span style={{fontWeight: "900"}}>{keyword}</span></h1> : <h1>Sorry! Your Search Result is Empty</h1>}
        {
            products.map(product => {
                return (
                    <Col key={product._id} xs={12} sm={6} md={4} lg={3} style={{textAlign: 'left'}}>
            <Link to={`/product/${product._id}`}>
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
                </Link>
      </Col>
     
                )
            })
             
        }
        </Row>
    </Container>
    
  )
  
}

export default SearchPage
