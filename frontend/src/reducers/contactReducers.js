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
    CONTACT_CREATE_REVIEW_REQUEST,
    CONTACT_CREATE_REVIEW_SUCCESS,
    CONTACT_CREATE_REVIEW_FAIL,
    CONTACT_CREATE_REVIEW_RESET,
    CONTACT_ADD_CATEGORY_REQUEST,
    CONTACT_ADD_CATEGORY_SUCCESS,
    CONTACT_ADD_CATEGORY_FAIL,
    CONTACT_ADD_CATEGORY_RESET,
    CONTACT_LIST_BY_CATEGORY_SUCCESS, 
    CONTACT_LIST_BY_CATEGORY_REQUEST,
    CONTACT_LIST_BY_CATEGORY_FAIL,   
    CONTACT_SEARCH_REQUEST,
    CONTACT_SEARCH_SUCCESS,
    CONTACT_SEARCH_FAIL,
    CONTACT_SEARCH_RESET,
    CONTACT_ADD_STORE_REQUEST,
    CONTACT_ADD_STORE_SUCCESS,
    CONTACT_ADD_STORE_FAIL,
    CONTACT_ADD_STORE_RESET,
    CONTACT_LIST_BY_STORE_SUCCESS, 
    CONTACT_LIST_BY_STORE_REQUEST,
    CONTACT_LIST_BY_STORE_FAIL,   
    
    
    } from "../constants/contactConstants"
export const contactListReducer = (state = {contacts: []}, action) => {
    switch(action.type){
        case CONTACT_LIST_REQUEST :
            return {loading: true, ...state}
        case CONTACT_LIST_SUCCESS :
            return {loading: false, success: true, contacts: action.payload} 
        case CONTACT_LIST_FAIL : 
            return {loading: false, error: action.payload}
        default: 
            return state;
    }
}

export const contactDetailsReducer = (state = {contact: {}}, action) => {
    switch(action.type){
        case CONTACT_DETAILS_REQUEST :
            return {loading: true, contact : {}}
        case CONTACT_DETAILS_SUCCESS :
            console.log('I am from CONTACT reducers')
            console.log(action.payload)
            return {loading: false, contact: action.payload} 
        case CONTACT_DETAILS_FAIL : 
            return {loading: false, error: action.payload}
        default: 
            return state;
    }
}

export const contactDeleteReducer = (state = {}, action) => {
    switch(action.type){
        case CONTACT_DELETE_REQUEST :
            return {loading: true}
        case CONTACT_DELETE_SUCCESS :
            return {loading: false, success: true} 
        case CONTACT_DELETE_FAIL : 
            return {loading: false, error: action.payload}
        default: 
            return state;
    }
}

export const contactCreateReducer = (state = {}, action) => {
    switch(action.type){
        case CONTACT_CREATE_REQUEST :
            return {loading: true}
        case CONTACT_CREATE_SUCCESS :
            return {loading: false, success: true, message: action.payload} 
        case CONTACT_CREATE_FAIL : 
            return {loading: false, error: action.payload}
        default: 
            return state;
    }
}