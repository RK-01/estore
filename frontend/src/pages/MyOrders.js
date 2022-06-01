import React, {useState, useEffect} from 'react'
import { useNavigate, useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {LinkContainer} from 'react-router-bootstrap'
import Message from '../components/Message.js'
import Loader from '../components/Loader.js'
import {Table, Container, Row, Col, Button, Image} from 'react-bootstrap'
import {myOrdersList, discardOrder} from '../actions/orderActions.js'

const MyOrders = () => {

  const dispatch = useDispatch()
  const orderMyList = useSelector(state=> state.orderMyList)
    const {orders, loading, error} = orderMyList

    const orderDiscard = useSelector(state => state.orderDiscard)
    const {order, loading: loadingDiscard, success: successDiscard} = orderDiscard
    useEffect(()=>{
      dispatch(myOrdersList())
      console.log(orders)
    },[dispatch, successDiscard])

    const handleDiscardOrder = (id) => {
       if(window.confirm('Are you sure to delete this product.')){
      dispatch(discardOrder(id))
    }
    }
  return (
    <Container>
      <h2>My Orders</h2>
      {loading ? <Loader /> : error ? <Message>{error}</Message> : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Total</th>
              <th>Paid</th>
              <th>Delivered</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
        {orders.map(order => (
          <tr key={order._id}>
            <td>{order._id}</td>
            <td>{order.createdAt.substring(0, 10)}</td>
            <td>{order.totalPrice}</td>
            <td>{order.isPaid ? <i className="fas fa-check" style={{color: 'green'}}></i>: <i className="fas fa-times" style={{color: 'red'}}></i>}</td>
            <td>{order.isDelivered ? <i className="fas fa-check" style={{color: 'green'}}></i>: <i className="fas fa-times" style={{color: 'red'}}></i>}</td>
            <td><LinkContainer to={`/order/${order._id}`} >
                <Button className='btn-sm' variant='light'>Details</Button>
              </LinkContainer>
              {!order.isPaid ? (
                <Button className='btn-sm' variant='danger' onClick={()=>handleDiscardOrder(order._id)}>Discard</Button>
              ) : <></>}
                
            </td>
          </tr>
          ))
        }
        </tbody>
        </Table>
        
      )}
    </Container>
  )
}

export default MyOrders
