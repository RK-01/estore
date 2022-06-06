import React, {useState, useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {Row, Col, Container, ListGroup, Image} from 'react-bootstrap'
import Product from '../components/Product.js'
import ProductCardItem from '../components/ProductCardItem.js'
import Loader from '../components/Loader.js'
import Message from '../components/Message.js'
import { listProducts } from '../actions/productActions.js'
import BannerCarousel from '../components/BannerCarousel.js'
import EasySecureFast from './EasySecureFast.js'
import {listCategories} from '../actions/categoryActions.js'
import ProductListByCategory from '../components/ProductListByCategory.js'
import AllCategories from '../components/AllCategories.js'


const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();
  
  const productList = useSelector(state => state.productList);
  const {products, success:successProductList, error: errorProductList} = productList;
  console.log(products)
  const categoryList = useSelector((state)=> state.categoryList);
  const { success, error, categories: categoriesData } = categoryList;
  //console.log(categories)
  
  const productsPerCategory = categoriesData.reduce((acc, category)=>{
    return [
      ...acc, 
      {
        ...category,
          productsData: products.filter((product)=>
          product.categories.find((cat)=>cat.category === category._id)
        ),
      },
    ];
  },[])
  const setData = () => {
    setCategories(productsPerCategory)
  }
  useEffect(()=>{
    let isMounted = true;
    if(isMounted){
      dispatch(listProducts())
    dispatch(listCategories())
    setData();
  }
  const cleanUp = () => {
    isMounted = false;
  }
  return cleanUp;
    },[dispatch, success, successProductList]);

  return (
    <div>
      <BannerCarousel />
      <EasySecureFast />
      <AllCategories/>
      <ProductListByCategory categories={categories}/>
    </div>
  )
  
}

export default HomePage;
