import React, {useState, useEffect} from 'react'
import { useNavigate, useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {LinkContainer} from 'react-router-bootstrap'
import Message from '../components/Message.js'
import Loader from '../components/Loader.js'
import {Table, Container, Row, Col, Button, Image} from 'react-bootstrap'
import AdminMenu from './AdminMenu.js'
import {listCategories, deleteCategory, createCategory} from '../actions/categoryActions'


const AdminCategories = () => {
  const dispatch = useDispatch()
  
  const categoryList = useSelector((state)=> state.categoryList) 
  const { loading, error, categories } = categoryList

  const categoryDelete = useSelector((state)=> state.categoryDelete) 
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = categoryDelete

  const categoryCreate = useSelector((state)=> state.categoryCreate) 
  const { loading: loadingCreate, error: errorCreate, success: successCreate, category: createdCategory } = categoryCreate

  const userLogin = useSelector((state) => state.userLogin)
  const {userInfo} = userLogin

  const navigate = useNavigate()

  useEffect(()=>{
    if(!userInfo.isAdmin){
      navigate('/login')
    }
    if(successCreate === false){
      navigate(`/admin/category/${createdCategory._id}/edit`)
    }else{
      dispatch(listCategories())
    }
  },[dispatch, userInfo, navigate, successDelete, successCreate])

  const createCategoryHandler = () => {
    dispatch(createCategory())
  }
  const deleteHandler = (id) => {
    if(window.confirm('Are you sure to delete this product.')){
      dispatch(deleteCategory(id))
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
            <Col><h1>CATEGORIES ({categories.length})</h1></Col>
            <Col className='text-right'>
              <Button className='my-3' onClick={createCategoryHandler}>
                  <i className='fas fa-plus'></i> Create Category
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
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
                {categories.map( category => {
              return (
                <tr key={category._id}>
                <td><Image src={category.image} width="150px" fluid/></td>
                <td>{category.name}</td>
                <td>
                  <LinkContainer to={`/category/${category._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <LinkContainer to={`/category/${category._id}/add-product`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-plus'></i>
                    </Button>
                  </LinkContainer>
                  
                  <Button variant='danger' className='btn-sm'
                   onClick={() => deleteHandler(category._id)}>
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

export default AdminCategories
