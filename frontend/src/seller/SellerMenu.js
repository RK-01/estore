import React from 'react'
import {Link} from 'react-router-dom'
import {Container, Row, Col, Button, ListGroup} from 'react-bootstrap'

const SellerMenu = () => {
  return (
      <main style={{textAlign:"left"}}>
            <ListGroup>
              <ListGroup.Item>
                  <Link to='/seller-dashboard'>Dashboard</Link>
              </ListGroup.Item>
              <ListGroup.Item>
                  <Link to='/seller-products'>Products</Link>
              </ListGroup.Item>
              <ListGroup.Item>
                  <Link to='/seller-orders'>Orders</Link>
              </ListGroup.Item>
              <ListGroup.Item>
                  <Link to='/seller-payment'>Payment</Link>
              </ListGroup.Item>
              <ListGroup.Item>
                  <Link to='/seller-store'>Store</Link>
              </ListGroup.Item>
              
              
              
            </ListGroup>
            </main>
  )
}

export default SellerMenu
