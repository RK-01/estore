import axios from 'axios'
import thunk from 'redux-thunk'
import { 
        CONTACT_LIST_REQUEST, 
        CONTACT_LIST_SUCCESS, 
        CONTACT_LIST_FAIL,  
        CONTACT_DETAILS_REQUEST, 
        CONTACT_DETAILS_SUCCESS, 
        CONTACT_DETAILS_FAIL,
        CONTACT_DELETE_REQUEST, 
        CONTACT_DELETE_SUCCESS, 
        CONTACT_DELETE_FAIL, 
        CONTACT_CREATE_REQUEST, 
        CONTACT_CREATE_SUCCESS, 
        CONTACT_CREATE_FAIL,
        CONTACT_UPDATE_REQUEST, 
        CONTACT_UPDATE_SUCCESS, 
        CONTACT_UPDATE_FAIL,
        CONTACT_UPDATE_RESET,   
        CONTACT_SEARCH_SUCCESS,
        CONTACT_SEARCH_REQUEST,
        CONTACT_SEARCH_FAIL,
        CONTACT_SEARCH_RESET,
        
    } from "../constants/contactConstants"

export const listContacts = () => async (dispatch) => {
try{
    dispatch({type: CONTACT_LIST_REQUEST})
    const {data} = await axios.get('/api/contacts')
    dispatch({type: CONTACT_LIST_SUCCESS, payload: data})

}catch(error){
    dispatch({
        type: CONTACT_LIST_FAIL,
        payload: 
        error.response && error.response.data.message ?
        error.response.data.message :
        error.message,
    })
    }
}
export const listContactDetails = (contactId) => async (dispatch) => {
try{
    dispatch({type: CONTACT_DETAILS_REQUEST})
    const {data} = await axios.get(`/api/contacts/${contactId}`)
    dispatch({type: CONTACT_DETAILS_SUCCESS, payload: data})

}catch(error){
    dispatch({
        type: CONTACT_DETAILS_FAIL,
        payload: 
        error.response && error.response.data.message ?
        error.response.data.message :
        error.message,
    })
    }
}

export const deleteContact = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CONTACT_DELETE_REQUEST
        })
        const {
            userLogin: {userInfo}
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            }
        }
        await axios.delete(`/api/contacts/${id}`, config)
        dispatch({
            type: CONTACT_DELETE_SUCCESS,
        })
    } catch (error) {
        dispatch({
        type: CONTACT_DELETE_FAIL,
        payload: 
        error.response && error.response.data.message ?
        error.response.data.message :
        error.message,
    })
    }
}

export const createContact = (contact) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CONTACT_CREATE_REQUEST
        })
        const {
            userLogin: {userInfo}
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            }
        }
        const {data} = await axios.post(`/api/contacts`, contact, config)
        dispatch({
            type: CONTACT_CREATE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
        type: CONTACT_CREATE_FAIL,
        payload: 
        error.response && error.response.data.message ?
        error.response.data.message :
        error.message,
    })
    }
}

