import React from 'react'
import {Link} from 'react-router-dom'
import {Container, Row, Col, Button, ListGroup} from 'react-bootstrap'

const AdminMenu = () => {
  return (
      <main style={{textAlign:"left"}}>
            <ListGroup>
              <ListGroup.Item>
                  <Link to='/admin-dashboard'>Dashboard</Link>
              </ListGroup.Item>
              <ListGroup.Item>
                  <Link to='/admin-orders'>Orders</Link>
              </ListGroup.Item>
              <ListGroup.Item>
                  <Link to='/admin-products'>Products</Link>
              </ListGroup.Item>
              <ListGroup.Item>
                  <Link to='/admin-categories'>Categories</Link>
              </ListGroup.Item>
              
              <ListGroup.Item>
                  <Link to='/admin-users'>Users</Link>
              </ListGroup.Item>
              <ListGroup.Item>
                  <Link to='/admin-Banners'>Banners</Link>
              </ListGroup.Item>
            <ListGroup.Item>
                  <Link to='/admin-stores'>Stores</Link>
              </ListGroup.Item>
            <ListGroup.Item>
                  <Link to='/admin-contacts'>Contact Messages</Link>
              </ListGroup.Item>
            
            </ListGroup>
            </main>
  )
}

export default AdminMenu
