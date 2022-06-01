import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {Link, useParams, useNavigate} from 'react-router-dom'
import {Form, Button, Table, Image} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { listProducts } from '../actions/productActions'
import { listCategoryDetails, addProductToCategory } from '../actions/categoryActions'
import { CATEGORY_LIST_REQUEST } from '../constants/categoryConstants'

const AdminAddProduct = () => {
  const [product, setProduct] = useState('')
  const [uploading, setUploading] = useState(false)

  const {id} = useParams()
  const navigate = useNavigate()
  
  const dispatch = useDispatch()

  const categoryDetails = useSelector(state => state.categoryDetails)
  const {category, error } = categoryDetails
  
  const productList = useSelector(state => state.productList)
  const {products, error: errorProductsList } = productList
  
  useEffect(()=>{
      dispatch(listProducts())
      dispatch(listCategoryDetails(id))
   },[dispatch, navigate, id])

  
  const submitHandler = (e) => {
    e.preventDefault()
    console.log("Product being added to category"+ product.name)
      dispatch(addProductToCategory(id, product))
  }
  // const handleInputChange =(name, catId) => {
  //   alert(name + catId)
  //   setName(name)
  //   setCategoryId(catId)
  // }
  return (
    <>
    <Link to='/admin-categories' className='btn btn-light my-3'>Go Back</Link>
    <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
                <tr>
                <td><Image src={category.image} width="150px" fluid/></td>
                <td>{category.name}</td>
                <td>
                  <LinkContainer to={`/product/${category._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <LinkContainer to={`/category/${category._id}/add-product`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-plus'></i>
                    </Button>
                  </LinkContainer>
                  </td>
              </tr>
              </tbody>
           </Table>
          
    <FormContainer>
      <h1>Add Product To Category</h1>
      <Form onSubmit={submitHandler}>
        
        <Form.Group>
          <Form.Label>Select Category</Form.Label>
          <Form.Select onChange={(e)=>setProduct(e.target.value)}>
            <option value=''>Select Product</option>
          {products.map((product) => 
          (
              <option key={product._id} value={product._id}>{product.name}</option>
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

export default AdminAddProduct

