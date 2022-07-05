import React from 'react'
import {Link} from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap';
import AllCategories from '../components/AllCategories.js'


const Footer = () => {
  return (
    <>
        <div className="container-fluid" style={{background: "#690fad", color: "#fff", paddingTop: "44px"}}>
            <div className="row">
                <div className="col-md-6">
                    <div className="text-container about">
                        <h4>About Us</h4>
                        <p className="white">We love animals and care for them.</p>
                    </div> 
                </div> 
                <div className="col-md-6">
                    <div className="text-container">
                        <h4>Useful Links</h4>
                        <ul className="list-unstyled li-space-lg white">
                            <li>
                                <a className="text-white" href="terms-conditions.html">Terms & Conditions</a>
                            </li>
                            <li>
                                <a className="text-white" href="privacy-policy.html">Privacy Policy</a>
                            </li>
                            <li>
                                <a className="text-white" href="#your-link">Returns & Refunds</a>
                            </li>
                            
                            <li>
                                <Link className="text-white" to="/seller-dashboard">Sell with Pet-Care</Link>
                            </li>
                            <li>
                                <a className="text-white" href="privacy-policy.html">Contact Us</a>
                            </li>
                        </ul>
                    </div> 
                </div> 
            </div> 
        </div>
    <div className="copyright">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <p className="p-small">Copyright © 2020 Pet-Care.in</p>
                </div>
            </div>
        </div>
    </div> 
    </> 
     )
}

export default Footer;
