import React, {useState, useEffect} from 'react'
import { useNavigate, useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {LinkContainer} from 'react-router-bootstrap'
import Message from '../components/Message.js'
import Loader from '../components/Loader.js'
import {Table, Container, Row, Col, Button, Image} from 'react-bootstrap'
import AdminMenu from './AdminMenu.js'
import {listStores, deleteStore, changeStatus} from '../actions/storeActions'

const AdminStores = () => {
  const dispatch = useDispatch()
  
  const storeList = useSelector((state)=> state.storeList) 
  const { loading, error, stores } = storeList

   const storeStatusChange = useSelector((state)=> state.storeStatusChange) 
   const { loading: loadingStatus, error: errorStatus, success: successStatus } = storeStatusChange

  const userLogin = useSelector((state) => state.userLogin)
  const {userInfo} = userLogin

  const navigate = useNavigate()

  useEffect(()=>{
    if(!userInfo.isAdmin){
      navigate('/login')
    }else{
      dispatch(listStores())
    }
  },[dispatch, userInfo, navigate, successStatus])

  const deleteHandler = (id) => {
    if(window.confirm('Are you sure to delete this product.')){
      dispatch(deleteStore(id))
  }
}
const changeStoreStatus = (e, id) => {
  console.log(id)
    dispatch(changeStatus(id))
}
  return (
    <Container style={{textAlign:'left'}}>
      <Row>
        <Col md={2}>
            <AdminMenu />
        </Col>
        <Col md={10}>
          <Row className='align-items-center'>
            <Col><h1>STORES ({stores.length})</h1></Col>
          </Row>
          {/* {loadingDelete && <Loader />}
          {errorDelete && <Message variant='danger'>{errorDelete}</Message>} */}
          {loading ? <Loader /> :

          error ? <Message variant="danger">{error}</Message> : 
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>User</th>
                <th>Detail</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
                {stores.map( store => {
              return (
                <tr key={store._id}>
                <td>{store.user}</td>
                <td>{store._id}<br />
                    <strong>Name: </strong>{store.name}<br />
                    <strong>Description: </strong>{store.description}<br />
                    <strong>GSTN: </strong>{store.gstn}<br />
                    <strong>PAN: </strong>{store.pan}<br />
                    <strong>Address: </strong>{store.address}<br />
                    <strong>City: </strong>{store.city}<br />
                    <strong>State: </strong>{store.state}<br />
                    <strong>Pincode: </strong>{store.pincode}<br />
                    <strong>Country: </strong>{store.country}<br />
                    </td>
                <td>{store.status === true?<i style={{color:"green"}} className='fas fa-check'></i>:<i style={{color:"red"}} className='fas fa-times'></i>}</td>
                <td>
                    <Button onClick={(e) => changeStoreStatus(e, store._id)} variant='light' className='btn-sm'>
                      Change Status
                    </Button>
                  <LinkContainer to={`/store/${store._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <LinkContainer to={`/admin-store/${store._id}/products`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-eye'></i>
                    </Button>
                  </LinkContainer>
                  
                  <Button variant='danger' className='btn-sm'
                   onClick={() => deleteHandler(store._id)}>
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

export default AdminStores
