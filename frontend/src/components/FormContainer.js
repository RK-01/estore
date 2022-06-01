import React from 'react'
import {Container, Row, Col} from 'react-bootstrap'

const FormContainer = ({children}) => {
  return (
    <Container style={{textAlign:'left', marginTop:'50px'}}>
        <Row className="justify-content-md-center">
            <Col xs={12} md={6}>
                {children}
            </Col>
        </Row>
      
    </Container>
  )
}

export default FormContainer
