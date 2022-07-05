import axios from 'axios';
import React, {useState} from 'react'

const ContactPage = () => {
	const [message, setMessage] = useState('');
	const [emailData, setEmailData] = useState({
		name: '',
		email : '',
		mobile : '',
		body: ''
	})

	const changeInputValue = (e) => {
		setEmailData({...emailData, [e.target.name] : e.target.value})
	}

	const { name, email, mobile, body } = emailData;

	const contactSubmitHandler = async (e) => {
		e.preventDefault()
		console.log(emailData)
		await axios.post('/api/contact', emailData)
		}

  return (
     <section id="contact">
  
 <div className="container">
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
					<textarea required name="body" value={body} onChange={changeInputValue} ></textarea>
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
