import React, {useState} from 'react'
import {Form, Button} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

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
    <Form style={{display:'flex'}} onSubmit={searchFormSubmit}>
        <Form.Control
            type="text"
            name="q"
            onChange={(e)=>setKeyword(e.target.value)} 
            placeholder="Search..."
            className="mr-sm-2 ml-sm-5"
            style={{borderRadius: "25px 0px 0px 25px"}}
            ></Form.Control>
            <Button 
                type="submit" 
                variant="outline-success" 
                className="p-2"
                style={{borderRadius: "0px 25px 25px 0px", background: "#690fad", color: "#fff", border: "1px solid #690fad", width: "70px"}}
                ><i className="fas fa-search"></i></Button>
        
    </Form>
  )
}

export default SearchBox
