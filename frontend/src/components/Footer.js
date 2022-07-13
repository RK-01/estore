import React from 'react'
import {Link} from 'react-router-dom'
import { Container, Image, Row, Col } from 'react-bootstrap';
import AllCategories from '../components/AllCategories.js'
import logo from '../logo.png'


const Footer = () => {
  return (
    <>
        <div className="container-fluid" style={{textAlign: "center", background: "#f6b93b", color: "#690fad", paddingTop: "12px"}}>
            <div className="row">
                 <Link to={`/`} ><Image src={logo} width='200px' fluid /></Link>
                <div>
                    <div className="text-container">
                            <Link className="text-purple" to="/aboutus"><small>About Us</small></Link>
                            <Link className="text-purple" to="/contact"><small>Contact Us</small></Link>
                            <Link className="text-purple" to="/termsofuse"><small>Terms of Use</small></Link>
                            <Link className="text-purple" to="/privacy"><small>Privacy Policy</small></Link>
                            <Link className="text-purple" to="/return"><small>Return & Refund Policy</small></Link>
                    </div>
                        <p className="text-purple"><small>Copyright © 2020 Pet-Care.in</small></p>
                </div> 
            </div> 
        </div>
    </> 
     )
}

export default Footer;
