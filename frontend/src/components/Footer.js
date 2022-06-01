import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import AllCategories from '../components/AllCategories.js'


const Footer = () => {
  return (
    <footer>
      <AllCategories />
  
      <div className="rk-footer">
          <Row>
            <Col>About Us</Col>
            <Col>
            <p>Policy</p>
            <div className="policy">
              <p>Terms Of Use</p>
              <p>Return Policy</p>
              <p>Privacy Policy</p>
            </div>
            </Col>
            <Col>Contact Us</Col>
          </Row>
          <Row><Col className='text-center py3'>&copy; {new Date().getFullYear()} EStore</Col></Row>
      </div>
    </footer>
  )
}

export default Footer;
