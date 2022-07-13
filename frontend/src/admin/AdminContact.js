import React, {useState, useEffect} from 'react'
import { useNavigate, useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {LinkContainer} from 'react-router-bootstrap'
import Message from '../components/Message.js'
import Loader from '../components/Loader.js'
import {Table, Container, Row, Col, Button, Image} from 'react-bootstrap'
import AdminMenu from './AdminMenu.js'
import {listContacts} from '../actions/contactActions'
import Moment from 'moment';


const AdminContact = () => {
  const dispatch = useDispatch()
  
  const contactList = useSelector((state)=> state.contactList) 
  const { loading, error, success, contacts } = contactList

  const userLogin = useSelector((state) => state.userLogin)
  const {userInfo} = userLogin

  const navigate = useNavigate()

  useEffect(()=>{
    if(!userInfo.isAdmin){
      navigate('/login')
    }else{
      dispatch(listContacts())
    }
  },[dispatch, userInfo, navigate, success])

//   const deleteHandler = (id) => {
//     if(window.confirm('Are you sure to delete this product.')){
//       dispatch(deleteContact(id))
//   }
// }
  return (
    <Container style={{textAlign:'left'}}>
      <Row>
        <Col md={2}>
            <AdminMenu />
        </Col>
        <Col md={10}>
          <Row className='align-items-center'>
            <Col><h1>Messages from contact form</h1></Col>
          </Row>
          {loading ? <Loader /> :

          error ? <Message variant="danger">{error}</Message> : 
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>Date</th>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Message</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
                {contacts.map( contact => {
              return (
                <tr key={contact._id}>
                <td>{Moment(contact.createdAt).format('DD-MM-YYYY hh:mm')}</td>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.mobile}</td>
                <td>{contact.message}</td>
                <td>
                  <LinkContainer to={`/contact/${contact._id}/view`}> 
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-eye'></i> View Details
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

export default AdminContact
