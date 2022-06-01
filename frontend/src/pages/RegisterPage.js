import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {Link} from 'react-router-dom'
import {Form, Row, Col, Button} from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { useNavigate } from 'react-router-dom'
import {register} from '../actions/userActions'

const RegisterPage = ({location}) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState(null)
    //const redirect = location.search ? location.search.split('=')[1]: '/'
    const dispatch = useDispatch();
    const userRegister = useSelector(state => state.userRegister)
    const {loading, error, userInfo} = userRegister;
    const navigate = useNavigate();
    useEffect(()=>{
        if(userInfo){
           navigate('/')  
        }
    },[navigate, userInfo])
    
    const submitHandler = async (e) => {
        e.preventDefault()
        dispatch(register(name, email, mobile, password))
    }
  return (
    <FormContainer>
      <h1 style={{textAlign: 'center'}}>Sign Up</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        {/* //Name */}
          <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Full Name" value={name} onChange={(e)=>setName(e.target.value)}></Form.Control>
            </Form.Group>
        {/* Email */}
          <Form.Group controlId='email'>
              <Form.Label>Email Address</Form.Label>
            <Form.Control type="email" placeholder="Enter Email" value={email} onChange={(e)=>setEmail(e.target.value)}></Form.Control>
          </Form.Group>
        {/* Mobile */}
          <Form.Group controlId='mobile'>
              <Form.Label>Mobile</Form.Label>
            <Form.Control type="number" placeholder="Enter Mobile Number" value={mobile} onChange={(e)=>setMobile(e.target.value)}></Form.Control>
          </Form.Group>
          {/* Password */}
          <Form.Group controlId='password'>
              <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter Password" value={password} onChange={(e)=>setPassword(e.target.value)}></Form.Control>
          </Form.Group>
          
          <Button type="submit" variant="primary">Register Now</Button>
      </Form>
      <Row className="py-2">
          {/* <Col>Not Yet Registered! <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>Register Now</Link></Col> */}
        <Col>Already Registered! <Link to="/login">Sign In</Link></Col>
      </Row>
    </FormContainer>
  )
}

export default RegisterPage
