import React, {useState, useEffect} from 'react'
import { useNavigate, useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {LinkContainer} from 'react-router-bootstrap'
import Message from '../components/Message.js'
import Loader from '../components/Loader.js'
import {Table, Container, Row, Col, Button, Image} from 'react-bootstrap'
import AdminMenu from './AdminMenu.js'
import {listOrders} from '../actions/orderActions.js'


const AdminOrders = () => {
  const dispatch = useDispatch()
  
  const orderList = useSelector((state)=> state.orderList) 
  const { loading, error, orders } = orderList

  const userLogin = useSelector((state) => state.userLogin)
  const {userInfo} = userLogin

  const navigate = useNavigate()

  useEffect(()=>{
    if(userInfo && userInfo.isAdmin){
      dispatch(listOrders())
    }else{
      navigate('/login')
    }
    },[dispatch, userInfo, navigate])

  return (
    <Container>
      <Row>
        <Col md={2}>
            <AdminMenu />
        </Col>
        <Col md={10}>
          <Row className='align-items-center'>
            {/* <Col><h1>ORDERS {orders.length}</h1></Col> */}
          </Row>
          {loading ? <Loader /> :

          error ? <Message variant="danger">{error}</Message> : 
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>Order Id</th>
                <th>User</th>
                <th>Date</th>
                <th>Total Price</th>
                <th>Payment Status</th>
                <th>Delivery Status</th>
              </tr>
            </thead>
            <tbody>
                {
                orders.map( order => {
              return (
                <tr key={order._id}>
                <td>{order.user && order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>Rs. {order.totalPrice}</td>
                <td>{order.isPaid ? (
                  <p>Paid on {order.paidAt.substring(0, 10)}</p>
                ) :
                  (
                    <i className='fas fa-times' style={{color:'red'}}></i>
                  )
                }</td>
                <td>{order.isDelivered ? (
                  order.deliveredAt.substring(0, 10)
                ) :
                  (
                    <i className='fas fa-times' style={{color:'red'}}></i>
                  )
                }</td><td>
                  <LinkContainer to={`/admin-order/${order._id}`}>
                    <Button variant='light' className='btn-sm'>
                      Details
                    </Button>
                  </LinkContainer>
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

export default AdminOrders
