import React from 'react'

const ContactPage = () => {

  return (
     <section id="contact">
  
 <div className="container">
	<div className="row">
			<h1 style={{textAlign:'center'}}>contact us</h1>
	</div>
	<div className="row">
			<h4 style={{textAlign:'center'}}>We'd love to hear from you!</h4>
	</div>
  <form className='contact-form'>
	<div className="row input-container">
			<div className="col-xs-12">
				<div className="styled-input wide">
					<label>Name</label> 
					<input type="text" required />
				</div>
			</div>
			<div className="col-md-6 col-sm-12">
				<div className="styled-input">
					<label>Email</label> 
					<input type="text" required />
				</div>
			</div>
			<div className="col-md-6 col-sm-12">
				<div className="styled-input">
					<label>Mobile</label> 
					<input type="text" required />
				</div>
			</div>
			<div className="col-xs-12">
				<div className="styled-input wide">
					<label>Message</label>
					<textarea required></textarea>
				</div>
			</div>
			<div className="col-xs-12">
				<div className="btn-lrg submit-btn">Send Message</div>
			</div>
	</div>
  </form>
</div>
</section>  
  
  )
}

export default ContactPage
