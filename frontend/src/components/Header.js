import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, Nav, Container, NavDropdown, Button, Image, ListGroup } from 'react-bootstrap';
import { logout } from '../actions/userActions'
import logo from '../logo.svg'
import SearchBox from './SearchBox'
import { PersonCircle, Cart, Gear, PersonPlus, CartCheck, BoxArrowRight, Folder, PersonLinesFill, BoxArrowInLeft } from "react-bootstrap-icons";
import SideMenu from './SideMenu'



const Header = () => {
  const cartContent = useRef();
  const [displayCartSummary, setDisplayCartSummary] = useState(false)
  const [displayUserOptions, setDisplayUserOptions] = useState(false)

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart)
  const { cartItems } = cart

  const showCartSummary = (e) => {
    setDisplayCartSummary(true)
    setDisplayUserOptions(false)
  }
  const showUserOptions = (e) => {

    setDisplayCartSummary(false)
    setDisplayUserOptions(true)
  }

  const hideCartSummary = (e) => {
    setDisplayCartSummary(false)
  }
  const hideUserOptions = (e) => {
    setDisplayUserOptions(false)
  }

  const logoutHandler = () => {
    dispatch(logout())
    setDisplayUserOptions(false)
  }
  useEffect(() => {
    console.log(displayCartSummary)
  }, [dispatch, userInfo, displayCartSummary])
  return (
    <header>
      {/* New Header */}
      <div className="header-container">

        <div className="rk-flex-row-container">
          {/* <div className="menu-container">
            <i className='fas fa-bars'></i>
          </div> */}
          <SideMenu/>
          <div className="brand-container">
            <Link to={`/`} ><Image src={logo} width='200px' fluid /></Link>
          </div>
        </div>
        <div className='search-container-large'><SearchBox /></div>
        <div className="rk-flex-row-container">
          <div className="cart-container">
            <Cart size={30} onClick={() => showCartSummary()} />
            {cartItems.length > 0 ?
              <div className="cart-count">{cartItems.reduce((acc, item) => acc + Number(item.qty), 0)}</div>
              :
              <></>
            }
          </div>
          {displayCartSummary &&
            (<div ref={cartContent} className="cart-content">
              <div className="cart-content-header"><h3>Cart Summary </h3><button className="rk-btn-close" onClick={() => hideCartSummary()}>Close</button>
              </div>
              <div className="cart-body">
              {cartItems.map(item => {
                return (<div key={item.product} className="cart-summary user-content-item">
                  <div>
                    <Image style={{ width: "66px" }} src={item.image} alt={item.name} fluid rounded />
                  </div>
                  <div>
                    <small>{item.name}</small><br />
                    <small style={{fontWeight:"bold"}}>Rs. {item.price} x {item.qty}</small>
                  </div>
                </div>
                )
              })
              }
              </div>
              <div className="cart-footer">
                <Link to={`/cart`} className="go-to-cart-btn">
                  Rs. {cartItems.reduce((acc, item) => acc + Number(item.qty) * item.price, 0)}<br />
                  Go to cart
                </Link>
              </div>
            </div>
            )
          }



          <div className="user-container"><PersonCircle onClick={() => showUserOptions()} size={30} />
            {userInfo ? (<>
              {displayUserOptions &&
                <div className="user-content">
                  <div className="user-options-header"><PersonCircle size={25} />&nbsp;{userInfo.name}</div>
                  <ListGroup>
                    <Link to="/profile" style={{ textDecoration: "none" }}><ListGroup.Item className="user-content-item"><PersonLinesFill size={15} />&nbsp;Profile</ListGroup.Item></Link>
                    <Link to="/myorders" style={{ textDecoration: "none" }}><ListGroup.Item className="user-content-item"><CartCheck size={15} />&nbsp;My Orders</ListGroup.Item></Link>
                    <Link to="/settings" style={{ textDecoration: "none" }}><ListGroup.Item className="user-content-item"><Gear size={15} />&nbsp;Settings</ListGroup.Item></Link>
                    {userInfo && userInfo.isAdmin && (
                      <Link to="/admin-dashboard" style={{ textDecoration: "none" }}><ListGroup.Item className="user-content-item"><Folder size={15} />&nbsp;Admin</ListGroup.Item></Link>
                    )}
                    {userInfo && userInfo.isSeller && (
                      <Link to="/seller-dashboard" style={{ textDecoration: "none" }}><ListGroup.Item className="user-content-item"><Folder size={15} />&nbsp;My Store</ListGroup.Item></Link>
                    )}
                    <ListGroup.Item onClick={logoutHandler} className="user-content-item"><BoxArrowRight size={15} />&nbsp;Logout</ListGroup.Item>
                  </ListGroup>
                  <button className="rk-btn-close" style={{ width: "100%" }} onClick={() => hideUserOptions()}>Close</button>
                </div>
              }
            </>) : (
              <>
                {displayUserOptions &&

                  <div className="user-content">
                    <ListGroup>
                      <Link to="/login" style={{ textDecoration: "none" }}><ListGroup.Item className="user-content-item"><BoxArrowInLeft />&nbsp;Sign In</ListGroup.Item></Link>
                      <Link to="/register" style={{ textDecoration: "none" }}><ListGroup.Item className="user-content-item"><PersonPlus />&nbsp;Sign Up</ListGroup.Item></Link>
                    </ListGroup>
                    <button className="rk-btn-close" style={{ width: "100%" }} onClick={() => hideUserOptions()}>Close</button>
                  </div>
                }
              </>
            )}

          </div>
        </div>
      </div>

      {/* Old header */}
      {/* <Navbar className="sticky" expand="lg" style={{color:"#690fad", background: "#f6b93b", padding: "0px"}} collapseOnSelect>
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
</Navbar> */}
      <div className="search-container-small" style={{ color: "#690fad", background: "#f6b93b", padding: "0px 20px 5px 20px" }}>
        <SearchBox />
      </div>

    </header>
  )
}

export default Header;
