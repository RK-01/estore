import React, {useState, useEffect} from 'react'
import { useNavigate, useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {LinkContainer} from 'react-router-bootstrap'
import Message from '../components/Message.js'
import Loader from '../components/Loader.js'
import {Table, Container, Row, Col, Button, Image} from 'react-bootstrap'
import AdminMenu from './AdminMenu.js'
import {listStoreDetails} from '../actions/storeActions'
import { listProductsByStore } from '../actions/productActions.js'


const AdminOneStoreProducts = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {id} = useParams()

    const storeDetails = useSelector((state)=> state.storeDetails) 
    const { loading, error, store, success } = storeDetails

    const productListByStore = useSelector((state)=> state.productListByStore) 
    const { products } = productListByStore

    
    const userLogin = useSelector((state) => state.userLogin)
    const {userInfo} = userLogin

  useEffect(()=>{
    if(!userInfo.isAdmin){
      navigate('/login')
    }else{
      dispatch(listStoreDetails(id))
      dispatch(listProductsByStore(id))
    }
  },[dispatch, userInfo, navigate, success])

  return (
    <Container style={{textAlign:'left'}}>
      <Row>
        <Col md={2}>
            <AdminMenu />
        </Col>
        <Col md={10}>
          <Row className='align-items-center'>
            <Col><h1>{store.name}</h1>
            <p>
            <span>{store.address}, </span>
            <span>{store.city}, </span>
            <span>{store.pincode}, </span>
            <span>{store.state}, </span>
            <span>{store.country}</span>
            </p>
            </Col>
          </Row>
          {loading ? <Loader /> :

          error ? <Message variant="danger">{error}</Message> : 
          <>
          <LinkContainer to={`/admin-store/${store._id}/products`}>
                    <Button variant='light' className='btn-sm'>
                      Products
                    </Button>
                  </LinkContainer>
                  <LinkContainer to={`/admin-store/${store._id}/orders`}>
                    <Button variant='light' className='btn-sm'>
                      Orders
                    </Button>
                  </LinkContainer>
                  <LinkContainer to={`/admin-store/${store._id}/payments`}>
                    <Button variant='light' className='btn-sm'>
                      Payments
                    </Button>
                  </LinkContainer>
                  
          </>
          }
          <div>
            <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Brand</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
          {products.map(product=>{
              return (
                <tr key={product._id}>
                <td><Image src={product.image} width="54px" fluid/></td>
                <td>{product._id}<br />{product.name}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
                <td>{product.brand}</td>
                <td>
                    <Button variant='light' className='btn-sm'>
                      Remove from store
                    </Button>
                </td>
              </tr>
              )
            })}
            </tbody>
           </Table>
          </div>
        </Col>
      </Row>
    </Container>

  )
}

export default AdminOneStoreProducts
