import React, {useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {Form, Button, Row, Col } from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from'../components/Loader'
import { getUserDetails } from '../actions/userActions'

const ProfilePage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userDetails = useSelector((state) => state.userDetails)
  const {loading, error, user} = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const {userInfo} = userLogin

  useEffect(()=>{
    if(!userInfo){
      navigate('/login')
    }else{
      if(!user.name){
        dispatch(getUserDetails('profile'))
      }else{
        setName(user.name)
        setEmail(user.email)
      }
    }
  },[dispatch, navigate, userInfo, user])
  return (
    <div>
      {name}{email}
    </div>
  )
}

export default ProfilePage
