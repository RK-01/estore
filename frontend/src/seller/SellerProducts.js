import React, {useState, useEffect} from 'react'
import { useNavigate, useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {LinkContainer} from 'react-router-bootstrap'
import Message from '../components/Message.js'
import Loader from '../components/Loader.js'
import {Table, Container, Row, Col, Button, Image} from 'react-bootstrap'
import SellerMenu from './SellerMenu.js'
import {listProducts, addStoreToProduct} from '../actions/productActions'

const SellerProducts = () => {
  const [store, setStore] = useState({})
  const dispatch = useDispatch()
  
  const productList = useSelector((state)=> state.productList) 
  const { loading, error, products } = productList

  const userLogin = useSelector((state) => state.userLogin)
  const {userInfo} = userLogin

  const storeDetailsOwner = useSelector(state => state.storeDetailsOwner)
const {loading: loadingStore, store: storeDetails, error: errorStoreDetails } = storeDetailsOwner

  const navigate = useNavigate()

  useEffect(()=>{
    if(!userInfo.isAdmin){
      navigate('/login')
    }else{
       dispatch(listProducts())
       setStore(storeDetails)
    }
  },[dispatch, userInfo, navigate])
  
  return (
    <Container style={{textAlign:'left'}}>
      <Row>
        <Col md={2}>
            <SellerMenu />
        </Col>
        <Col md={10}>
          <Row className='align-items-center'>
            <Col><h1>PRODUCTS</h1></Col>
          </Row>
          {loading ? <Loader /> :

          error ? <Message variant="danger">{error}</Message> : 
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Brand</th>
                <th>In My Store</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
                {products.map( product => {
              return (
                <tr key={product._id}>
                <td><Image src={product.image} width="70px" fluid/></td>
                <td>
                  Name: {product.name}<br />
                  MRP: {product.mrp}<br />
                  packaging: {product.packaging}<br />
                </td>
                <td>{product.price}</td>
                <td>{product.brand}</td>
                <td></td>
                <td>
                  <LinkContainer to={`/seller-product/${product._id}`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-eye'>Veiw Details</i>
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

export default SellerProducts
