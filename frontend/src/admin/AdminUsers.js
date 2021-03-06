import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {LinkContainer} from 'react-router-bootstrap'
import {Container, Table, Row, Col, Button} from 'react-bootstrap'
import {listUsers, deleteUser, changeStatus} from '../actions/userActions'
import AdminMenu from './AdminMenu.js'
import { Navigate } from 'react-router-dom'

const AdminUsers = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userList = useSelector((state) => state.userList)
  const {loading, error, users} = userList

  const userStatusChange = useSelector((state)=> state.userStatusChange) 
   const { loading: loadingStatus, error: errorStatus, success: successStatus } = userStatusChange

  const userLogin = useSelector((state) => state.userLogin)
  const {userInfo} = userLogin

  const userDelete = useSelector((state) => state.userDelete)
  const {success:successDelete} = userDelete

  useEffect(()=>{
    if(userInfo && userInfo.isAdmin){
      dispatch(listUsers())
    }else{
      Navigate('/login')
    }
    
  },[dispatch, navigate, successDelete, successStatus])

  const deleteUserHandler = (id) => {
    if(window.confirm('Are you sure to delete this user.')){
      dispatch(deleteUser(id))
    }
  }

  const changeUserStatus = (e, id) => {
  console.log(id)
    dispatch(changeStatus(id))
}

  return (
    <Container style={{textAlign: 'left'}}>
      <Row>
        <Col md={2}>
            <AdminMenu />
        </Col>
        <Col md={10}>
          <h1>Users ({users.length})</h1>
          {loading ? <Loader/>: error ? <Message variant='danger'>{error}</Message> :
          (
            <Table striped bordered hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Is Admin</th>
                  <th>Is Seller</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  users.map(user => (
                    <tr key={user._id}>
                      <td>{user._id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.isAdmin ? (<i className='fas fa-check' style={{color: 'green'}}></i>) : <i className='fas fa-times' style={{color:'red'}}></i>}</td>
                      <td>{user.isSeller ? (<i className='fas fa-check' style={{color: 'green'}}></i>) : <i className='fas fa-times' style={{color:'red'}}></i>}</td>
                      <td>
                        <Button onClick={(e) => changeUserStatus(e, user._id)} variant='light' className='btn-sm'>
                      Change Status
                    </Button>
                      <LinkContainer to={`/user/${user._id}/edit`}>
                          <Button variant='ligth' className='btn btn-sm'>
                            <i className='fas fa-edit'></i>
                          </Button>
                        </LinkContainer>
                        <Button variant='danger' className='btn-sm' onClick={()=>deleteUserHandler(user._id)}>
                          <i className='fas fa-trash'></i>
                        </Button>
                        </td>
                    </tr>
          ))
                }
              </tbody>
            </Table>
          )}

        </Col>
      </Row>
    </Container>
  )
}

export default AdminUsers
