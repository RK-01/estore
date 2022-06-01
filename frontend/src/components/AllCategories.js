import React, {useState, useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {Row, Col, Container, Image} from 'react-bootstrap'
import Product from '../components/Product.js'
import Loader from '../components/Loader.js'
import Message from '../components/Message.js'
import { listProducts } from '../actions/productActions.js'
import ProductListByCategory from '../components/ProductListByCategory'
import {listCategories} from '../actions/categoryActions'



const AllCategories = () => {
    const dispatch = useDispatch();

  const categoryList = useSelector((state)=> state.categoryList) 
  const { success, error, categories } = categoryList

  
  useEffect(()=>{
     dispatch(listCategories())
    // console.log(categories)
  },[dispatch]);

  return (
    <div className='category-box'>
        <div className="category-container">
            
      { categories.map( category =>{ 
       
      return (
                <div key={category._id} className='category-item'>
                      <Link to={`/category/${category._id}`}>
                        <Image style={{width: "64px", height: "64px", borderRadius: "64px"}} src={category.image}></Image>
                        <p>{category.name}</p>
                    </Link>
                </div>
          
      )})

}
</div>
    </div>
  )
}

export default AllCategories
