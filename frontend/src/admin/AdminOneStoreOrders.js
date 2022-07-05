import React, {useState, useEffect} from 'react'
import { useNavigate, useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {LinkContainer} from 'react-router-bootstrap'
import Message from '../components/Message.js'
import Loader from '../components/Loader.js'
import {Table, Container, Row, Col, Button, Image} from 'react-bootstrap'
import AdminMenu from './AdminMenu.js'
import {listStoreDetails, listStores} from '../actions/storeActions'
import {mySellerOrdersList} from '../actions/sellerOrderActions'


const AdminOneStoreOrders = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {id} = useParams()

    const storeDetails = useSelector((state)=> state.storeDetails) 
    const { loading, error, store, success } = storeDetails

        
    
    const sellerOrderMyList = useSelector((state)=> state.sellerOrderMyList) 
    const { loading: errorLoading, error: errorSellerOrders, sellerOrders, success:successOrderList } = sellerOrderMyList

    const userLogin = useSelector((state) => state.userLogin)
    const {userInfo} = userLogin

  useEffect(()=>{
    if(!userInfo.isAdmin){
      navigate('/login')
    }else{
      dispatch(listStoreDetails(id))
      dispatch(mySellerOrdersList(id))
     }
  },[dispatch, userInfo, navigate, success, successOrderList])

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
          </>
          }
        
      {sellerOrders ?
      <>
      <Table>
          <tr>
            <th>Total Items Price</th>
            <th>GSTN</th>
            <th>Shipping</th>
            <th>Total</th>
            <th>Delivery</th>
            <th>Settlement</th>
            <th>Remarks</th>
            <th>Action</th>
          </tr>
      { sellerOrders.map(sellerOrder => {
       return ( <tr key={sellerOrder._id}>
              <td>{sellerOrder.itemsPrice}</td>
              <td>{sellerOrder.taxPrice}</td>
              <td>{sellerOrder.shippingCost}</td>
              <td>{sellerOrder.totalPrice}</td>
              <td>{sellerOrder.isPaymentSettled}</td>
              <td>{sellerOrder.isDelivered}</td>
              <td>{sellerOrder.remarks}</td>
              <td><LinkContainer to={`/admin-store/${sellerOrder._id}/order`}>
                    <Button variant='light' className='btn-sm'>
                      View
                    </Button>
                  </LinkContainer>
                  <LinkContainer to={`/admin-store/${sellerOrder._id}/payment`}>
                    <Button variant='light' className='btn-sm'>
                      Settlement
                    </Button>
                  </LinkContainer>
                  
                  </td>
              
        </tr>
      )
      })
    }
    </Table>
    </>
    : <>No Orders</>
      }
       </Col>
      </Row>
    </Container>

  )
}

export default AdminOneStoreOrders
