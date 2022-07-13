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
      <div className="">
        {
        categories.map((category, index)=> {
          return (
            <Row key={category._id}  style={{background: index % 2 !== 0 ? "#dfe4ea" : "#f7f1e3"}}>
                <div className="products-container">
                  <div className="category-section-title">
                    <div className='category-title'>{category.name}</div>
                    <Link className="category-view-all-link" to={`/category/${category._id}`}>View All</Link>
                  </div>
              
                  {
                  category.productsData.map((product)=> {
                    return (
                      <div className="product-container">
                          <Product key={product._id} product={product}/>
                      </div>
                    )
                  })
                }
                </div>
            </Row>
          )
        })
      }
      </div>
  )
}
export default ProductListByCategory;
