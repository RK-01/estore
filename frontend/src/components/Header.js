import React, { useEffect } from 'react';
import {LinkContainer} from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import {Navbar, Nav, Container, NavDropdown, Image} from 'react-bootstrap';
import {logout} from '../actions/userActions'
import logo from '../logo.svg'
import SearchBox from './SearchBox'


const Header = () => {
 const userLogin = useSelector(state=> state.userLogin);
 const {userInfo} = userLogin
 const dispatch = useDispatch();
  const cart = useSelector(state => state.cart)
  const {cartItems} = cart

  const logoutHandler = () => {
    dispatch(logout())
  }
  useEffect(()=>{

  },[dispatch, userInfo])
  return (
    <header>
      <Navbar className="sticky" expand="lg" style={{color:"#690fad", background: "#f6b93b", padding: "0px"}} collapseOnSelect>
  <Container style={{display:"flex", justifyContent: "space-between"}} fluid>
    <div>
    <Navbar.Brand href="/"><Image src={logo} width='200px' fluid/></Navbar.Brand>
    </div>
    <div>
      
    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
    <Navbar.Collapse id="basic-navbar-nav">
    <Nav style={{display:"flex", justifyContent: "center", alignItems: "center"}}>
        <Nav.Link href="/cart">
        <div className="rk-flex-row" style={{background: "#690fad", color:"#fff", border: "1px solid #f6b93b", padding:"4px", borderRadius: "4px"}}>
          <div><i className='fas fa-shopping-cart'></i> Cart
          </div>
          { cartItems.length > 0 
            ?
            <div><span>{cartItems.reduce((acc, item)=> acc+Number(item.qty), 0)} Items <br />
              Rs. {cartItems.reduce((acc, item)=> acc + Number(item.qty) * item.price, 0)}</span>
            </div>
            :
            <></>
          }
              </div>
        </Nav.Link>
        {userInfo ? (
          <NavDropdown title={userInfo.name} id='username'>
            <LinkContainer to="/profile">
              <NavDropdown.Item>Profile</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to="/favourites">
              <NavDropdown.Item>My Favourite</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to="/myorders">
              <NavDropdown.Item>My Orders</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to="/settings">
              <NavDropdown.Item>Settings</NavDropdown.Item>
            </LinkContainer>
            {userInfo && userInfo.isAdmin && (
              <LinkContainer to="/admin-dashboard">
              <NavDropdown.Item>Admin</NavDropdown.Item>
              </LinkContainer>
              )
            }
            
            <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
          </NavDropdown>
        ):
           <Nav.Link href="/login"><i className='fas fa-user'></i> Sign In</Nav.Link>
        }
        </Nav>
    </Navbar.Collapse>
    </div>
  </Container>
</Navbar>
 <div style={{color:"#690fad", background: "#f6b93b", padding: "0px 20px 5px 20px"}}>
  <SearchBox />
    </div>
    
    </header>
  )
}

export default Header;
