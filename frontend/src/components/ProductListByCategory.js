import React, {useMemo, useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {Row, Col, Container, Card} from 'react-bootstrap'
import Product from '../components/Product.js'
import Loader from '../components/Loader.js'
import Message from '../components/Message.js'
import { listProductsByCategory } from '../actions/productActions.js'
import {listCategoryDetails} from '../actions/categoryActions';
import Rating from './Rating'


const ProductListByCategory = ({categories}) => {
   useEffect(()=>{
console.log(categories)
   },[])
  return (
      <div className="my-4 mx-3">
        {
        categories.map((category, index)=> {
          return (
            <Row key={category._id}  style={{background: index % 2 !== 0 ? "#dfe4ea" : "#f7f1e3"}}>
              <h3 style={{textAlign: "left"}}><Link to={`/category/${category._id}`}></Link>{category.name}</h3>
                {
                  category.productsData.map((product)=> {
                    return (
                      <Col xs={6} sm={6} md={6} lg={4} xl={3}>
                          <Product key={product._id} product={product}/>
                      </Col>
                    )
                  })
                }
            </Row>
          )
        })
      }
      </div>
  )
}
export default ProductListByCategory;
