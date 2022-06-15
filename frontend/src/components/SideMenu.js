import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Button, Image} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import {listCategories} from '../actions/categoryActions'
import { useDispatch, useSelector } from 'react-redux'

 
  
	
const SideMenu = () => {
    const dispatch = useDispatch();

  const categoryList = useSelector((state)=> state.categoryList) 
  const { success, error, categories } = categoryList

/* Set the width of the side navigation to 250px and the left margin of the page content to 250px and add a black background color to body */
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("overlay").classList.add('overlay');
  }

/* Set the width of the side navigation to 0 and the left margin of the page content to 0, and the background color of body to white */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("overlay").classList.remove('overlay');
  }

  useEffect(()=>{
     dispatch(listCategories())
    // console.log(categories)
  },[dispatch]);



  return (
    <>
    <div id="mySidenav" className="sidenav">
  <a href="javascript:void(0)" className="closebtn" onClick={(e)=>closeNav(e)}>&times;</a>
{ categories.map( category =>{ 
       
      return (
                <div key={category._id} className='menu-item'>
                      <Link to={`/category/${category._id}`}>
                        <Image style={{width: "64px", height: "64px", borderRadius: "64px"}} src={category.image}></Image>
                    </Link>
                    <Link to={`/category/${category._id}`}>
                        <p>{category.name}</p>
                    </Link>
                </div>
          
      )})

}
  <Link to="/aboutus"><small>About Us</small></Link>
  <Link to="/contact"><small>Contact Us</small></Link>
  <Link to="/termsofuse"><small>Terms of Use</small></Link>
  <Link to="/privacy"><small>Privacy Policy</small></Link>
  <Link to="/return"><small>Return & Refund Policy</small></Link>
</div>
<FontAwesomeIcon icon={faBars} onClick={(e)=>openNav(e)} style={{fontSize:"1.5rem"}}/>
<div id="overlay"></div>
</>
  )
}

export default SideMenu
