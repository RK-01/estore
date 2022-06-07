import React, {useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {Row, Col, Container} from 'react-bootstrap'
import Product from '../components/Product.js'
import Loader from '../components/Loader.js'
import Message from '../components/Message.js'
import { listProductsByCategory } from '../actions/productActions.js'
import {listCategoryDetails} from '../actions/categoryActions';
import Paginate from '../components/Paginate.js'

const CategoryPage = ({categoryName}) => {
  const {categoryId} = useParams();
  const {pageNumber} = useParams('1');
  const dispatch = useDispatch();
  
  const productListByCategory = useSelector(state=> state.productListByCategory)
  const {products, loading, error, page, pages} = productListByCategory

  const categoryDetails = useSelector(state=> state.categoryDetails)
  const {category, success: successCategoryDetails} = categoryDetails

  useEffect(()=>{
    //console.log(categoryId)
    dispatch(listCategoryDetails(categoryId))
    dispatch(listProductsByCategory(categoryId, pageNumber))
   // console.log(products)
  },[dispatch, categoryId, successCategoryDetails, pageNumber])
  return (
    <div>
      <div className="my-4 mx-3">
      <h1 style={{textAlign: "left"}}>{category.name}</h1>
      {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
      : 
      <>
      <Row>
      {
        products.map((product)=>{
          return (
          <Col key={product._id} xs={12} sm={6} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
          );
        })
      }
      </Row>
      <Paginate pages={pages} page={page} categoryId={categoryId} keyword={''}/>
      </>
      }
      </div>
          </div>
  )
}

export default CategoryPage;
