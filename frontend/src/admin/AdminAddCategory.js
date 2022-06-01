import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {Link, useParams, useNavigate} from 'react-router-dom'
import {Form, Button, Table, Image} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { listProductDetails, addCategoryToProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'
import { listCategories } from '../actions/categoryActions'
import { CATEGORY_LIST_REQUEST } from '../constants/categoryConstants'

const AdminAddCategory = () => {
  const [category, setCategory] = useState('')
  const [uploading, setUploading] = useState(false)

  const {id} = useParams()
  const navigate = useNavigate()
  
  const dispatch = useDispatch()

  const productDetails = useSelector(state => state.productDetails)
  const {loading, product, error } = productDetails
  
  const categoryList = useSelector(state => state.categoryList)
  const {loading: loadingCategoryList, categories, error: errorCategoryList } = categoryList
  
  useEffect(()=>{
      dispatch(listCategories())
      dispatch(listProductDetails(id))
   },[dispatch, navigate, id])

  
  const submitHandler = (e) => {
    e.preventDefault()
      dispatch(addCategoryToProduct(id, category))
  }
  // const handleInputChange =(name, catId) => {
  //   alert(name + catId)
  //   setName(name)
  //   setCategoryId(catId)
  // }
  return (
    <>
    <Link to='/admin-products' className='btn btn-light my-3'>Go Back</Link>
    <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Brand</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
                <tr>
                <td><Image src={product.image} width="150px" fluid/></td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td></td>
                <td>{product.brand}</td>
                <td>
                  <LinkContainer to={`/product/${product._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <LinkContainer to={`/product/${product._id}/add-category`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-plus'></i>
                    </Button>
                  </LinkContainer>
                  </td>
              </tr>
              </tbody>
           </Table>
          
    <FormContainer>
      <h1>Add Category To Product</h1>
      <Form onSubmit={submitHandler}>
        
        <Form.Group>
          <Form.Label>Select Category</Form.Label>
          <Form.Select onChange={(e)=>setCategory(e.target.value)}>
            <option value=''>Select Category</option>
          {categories.map(category => 
          (
              <option key={category._id} value={category._id}>{category.name}</option>
          ))}
              </Form.Select>
        </Form.Group>
        <Form.Group>
          <Button type="submit" variant='primary' className="btn btn-block">Update</Button>
        </Form.Group>
      </Form>
    </FormContainer>
    </>
  )
}

export default AdminAddCategory

