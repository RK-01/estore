import React, {useState} from 'react'
import {Form, Button} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBorderNone, faMagnifyingGlass, faTimes } from '@fortawesome/free-solid-svg-icons'

const SearchBox = () => {
    const [keyword, setKeyword] = useState('')
    const navigate = useNavigate()

    const searchFormSubmit = (e) => {
        e.preventDefault()
        if(keyword){
            navigate(`/search/${keyword.trim()}`)
        }else{
            navigate('/')
        }
        
    }
    return (
        <Form onSubmit={searchFormSubmit}>
    <div className="search-bar-wrapper">
        <div className="fas fa-search search-icon"></div>   
            <input
            type="search"
            name="q"
            onChange={(e)=>setKeyword(e.target.value)} 
            placeholder="Search..."
            style={{background: "#fff", alignSelf: 'stretch',height: "100%", border: 'none', outline: 'none'}}
            />
            <div className=""><button className="search-btn" type="submit">Search</button></div>
    </div>
    </Form>
  )
}

export default SearchBox
