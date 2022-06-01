import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {Link} from 'react-router-dom'
import {Form, Row, Col, Button} from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { useNavigate } from 'react-router-dom'
import {login} from '../actions/userActions'

const LoginPage = ({location}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    //const redirect = location.search ? location.search.split('=')[1]: '/'
    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin)
    const {loading, error, userInfo} = userLogin;
    const navigate = useNavigate();
    useEffect(()=>{
        if(userInfo){
           navigate('/')  
        }
    },[navigate, userInfo])
    const submitHandler = async (e) => {
        e.preventDefault()
        dispatch(login(email, password))
       }
  return (
    <FormContainer>
      <h1 style={{textAlign: 'center'}}>Sign In</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
          <Form.Group controlId='email'>
              <Form.Label>Email Address</Form.Label>
            <Form.Control type="email" placeholder="Enter Email" value={email} onChange={(e)=>setEmail(e.target.value)}></Form.Control>
          </Form.Group>
          <Form.Group controlId='password'>
              <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter Password" value={password} onChange={(e)=>setPassword(e.target.value)}></Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary">Sign In</Button>
      </Form>
      <Row className="py-2">
          {/* <Col>Not Yet Registered! <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>Register Now</Link></Col> */}
        <Col>Not Yet Registered! <Link to="/register">Register Now</Link></Col>
      
      </Row>
    </FormContainer>
  )
}

export default LoginPage
