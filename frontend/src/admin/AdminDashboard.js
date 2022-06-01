import React from 'react'
import {Link} from 'react-router-dom'
import {Container, Row, Col, Button, ListGroup} from 'react-bootstrap'
import AdminMenu from './AdminMenu.js'

const AdminDashboard = () => {
  return (
    <Container>
      <Row>
        <Col md={4}>
            <AdminMenu />
        </Col>
        <Col md={8}>dashboard</Col>
      </Row>
    </Container>
  )
}

export default AdminDashboard
