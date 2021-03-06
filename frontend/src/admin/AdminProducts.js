import React, {useState, useEffect} from 'react'
import { useNavigate, useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {LinkContainer} from 'react-router-bootstrap'
import Message from '../components/Message.js'
import Loader from '../components/Loader.js'
import {Table, Container, Row, Col, Button, Image} from 'react-bootstrap'
import AdminMenu from './AdminMenu.js'
import {listProducts, deleteProduct, createProduct} from '../actions/productActions'


const AdminProducts = () => {
  const dispatch = useDispatch()
  
  const productList = useSelector((state)=> state.productList) 
  const { loading, error, products } = productList

  const productDelete = useSelector((state)=> state.productDelete) 
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete

  const productCreate = useSelector((state)=> state.productCreate) 
  const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct } = productCreate

  const userLogin = useSelector((state) => state.userLogin)
  const {userInfo} = userLogin

  const navigate = useNavigate()

  useEffect(()=>{
    if(!userInfo.isAdmin){
      navigate('/login')
    }
    if(successCreate === false){
      navigate(`/admin/product/${createdProduct._id}/edit`)
    }else{
      dispatch(listProducts())
    }
  },[dispatch, userInfo, navigate, successDelete, successCreate])

  const createProductHandler = () => {
    dispatch(createProduct())
  }
  const deleteHandler = (id) => {
    if(window.confirm('Are you sure to delete this product.')){
      dispatch(deleteProduct(id))
  }
}
  return (
    <Container style={{textAlign:'left'}}>
      <Row>
        <Col md={2}>
            <AdminMenu />
        </Col>
        <Col md={10}>
          <Row className='align-items-center'>
            <Col><h1>PRODUCTS ({products.length})</h1></Col>
            <Col className='text-right'>
              <Button className='my-3' onClick={createProductHandler}>
                  <i className='fas fa-plus'></i> Create Product
              </Button>
            </Col>
          </Row>
          {loadingDelete && <Loader />}
          {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
          {loadingCreate && <Loader />}
          {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
          {loading ? <Loader /> :

          error ? <Message variant="danger">{error}</Message> : 
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
                {products.map( product => {
              return (
                <tr key={product._id}>
                <td><Image src={product.image} width="150px" fluid/></td>
                <td>{product._id}<br />{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
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
                  
                  <Button variant='danger' className='btn-sm'
                   onClick={() => deleteHandler(product._id)}>
                      <i className='fas fa-trash'></i>
                    </Button>
                </td>
              </tr>
              )
            })}
            </tbody>
           </Table>
          }
        </Col>
      </Row>
    </Container>
  )
}

export default AdminProducts
