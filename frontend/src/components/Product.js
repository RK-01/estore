import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import {Card} from 'react-bootstrap'
import Rating from './Rating'

const Product = ({product}) => {
    useEffect(()=>{
        console.log(product)
    },[])
    return (
        <Card className='rounded' style={{textAlign: "left"}}>
            <Link to={`/product/${product._id}`}><center><Card.Img style={{padding: "10px", width: "100%", height:"auto"}} src={product.image} alt={product.name}/></center></Link>
            <Card.Body>
                    <Card.Title as="div"><strong>{product.name}</strong></Card.Title>
                    <Card.Text as="div"><Rating value={product.rating} text={`${product.numReviews} reviews`}/></Card.Text>
                    <Card.Text as="h3">Rs. {product.price}</Card.Text>
            </Card.Body> 
        </Card>
    )

}

export default Product;