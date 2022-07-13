import React, {useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {Row, Col, Container} from 'react-bootstrap'
import Loader from '../components/Loader.js'
import Message from '../components/Message.js'
import {createContact} from '../actions/contactActions';


const ContactPage = () => {
	const [contactData, setContactData] = useState({
		name: '',
		email : '',
		mobile : '',
		message: ''
	})
	const dispatch = useDispatch()
	const contactCreate = useSelector(state => state.contactCreate)
	const {error, success, message: contactMessage} = contactCreate;

	const changeInputValue = (e) => {
		setContactData({...contactData, [e.target.name] : e.target.value})
	}

	const { name, email, mobile, message } = contactData;

	const contactSubmitHandler = async (e) => {
		e.preventDefault()
		dispatch(createContact(contactData))	
	}
 useEffect(()=>{
	//
 },[success])
  return (
     <section id="contact">
  
 <div className="container">
	{success && <p>{contactMessage}</p>}
	<div className="row">
			<h1 style={{textAlign:'center'}}>contact us</h1>
	</div>
	<div className="row">
			<h4 style={{textAlign:'center'}}>We'd love to hear from you!</h4>
	</div>
  <form className='contact-form' onSubmit={contactSubmitHandler}>
	<div className="row input-container">
			<div className="col-xs-12">
				<div className="styled-input wide">
					<label>Name</label> 
					<input type="text" name="name" value={name} required onChange={changeInputValue}/>
				</div>
			</div>
			<div className="col-md-6 col-sm-12">
				<div className="styled-input">
					<label>Email</label> 
					<input type="email" name="email" value={email} required onChange={changeInputValue}/>
				</div>
			</div>
			<div className="col-md-6 col-sm-12">
				<div className="styled-input">
					<label>Mobile</label> 
					<input type="number" name="mobile" value={mobile} onChange={changeInputValue} required />
				</div>
			</div>
			<div className="col-xs-12">
				<div className="styled-input wide">
					<label>Message</label>
					<textarea required name="message" value={message} onChange={changeInputValue} ></textarea>
				</div>
			</div>
			<div className="col-xs-12">
				<button type="submit" className="btn-lrg submit-btn">Send Message</button>
			</div>
	</div>
  </form>
</div>
</section>  
  
  )
}

export default ContactPage
