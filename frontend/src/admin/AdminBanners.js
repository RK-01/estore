import React, {useState, useEffect} from 'react'
import { useNavigate, useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {LinkContainer} from 'react-router-bootstrap'
import Message from '../components/Message.js'
import Loader from '../components/Loader.js'
import {Table, Container, Row, Col, Button, Image} from 'react-bootstrap'
import AdminMenu from './AdminMenu.js'
import {listBanners, deleteBanner, createBanner} from '../actions/bannerActions'


const AdminBanners = () => {
  const dispatch = useDispatch()
  
  const bannerList = useSelector((state)=> state.bannerList) 
  const { loading, error, banners } = bannerList

  const bannerDelete = useSelector((state)=> state.bannerDelete) 
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = bannerDelete

  const bannerCreate = useSelector((state)=> state.bannerCreate) 
  const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdBanner } = bannerCreate

  const userLogin = useSelector((state) => state.userLogin)
  const {userInfo} = userLogin

  const navigate = useNavigate()

  useEffect(()=>{
    if(!userInfo.isAdmin){
      navigate('/login')
    }
    if(successCreate === false){
      navigate(`/admin/banner/${createdBanner._id}/edit`)
    }else{
      dispatch(listBanners())
    }
  },[dispatch, userInfo, navigate, successDelete, successCreate])

  const createBannerHandler = () => {
    dispatch(createBanner())
  }
  const deleteHandler = (id) => {
    if(window.confirm('Are you sure to delete this product.')){
      dispatch(deleteBanner(id))
  }
}
  return (
    <Container style={{textAlign:'left'}}>
      <Row>
        <Col md={2}>
            <AdminMenu />
        </Col>
        <Col md={10}>
          <Row className='align-items-center'>
            <Col><h1>BANNERS</h1></Col>
            <Col className='text-right'>
              <Button className='my-3' onClick={createBannerHandler}>
                  <i className='fas fa-plus'></i> Create Banner
              </Button>
            </Col>
          </Row>
          {loadingDelete && <Loader />}
          {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
          {loadingCreate && <Loader />}
          {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
          {loading ? <Loader /> :

          error ? <Message variant="danger">{error}</Message> : 
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>Image</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
                {banners.map( banner => {
              return (
                <tr key={banner._id}>
                <td><Image src={banner.image} width="150px" fluid/></td>
                <td>{banner.status}</td>
                <td>
                  <LinkContainer to={`/banner/${banner._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button variant='danger' className='btn-sm'
                   onClick={() => deleteHandler(banner._id)}>
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

export default AdminBanners
