import { 
    STORE_LIST_REQUEST, 
    STORE_LIST_SUCCESS, 
    STORE_LIST_FAIL, 
    STORE_DETAILS_REQUEST, 
    STORE_DETAILS_SUCCESS, 
    STORE_DETAILS_FAIL, 
    STORE_OWNER_DETAILS_REQUEST, 
    STORE_OWNER_DETAILS_SUCCESS, 
    STORE_OWNER_DETAILS_FAIL, 
    STORE_DELETE_REQUEST,
    STORE_DELETE_SUCCESS,
    STORE_DELETE_FAIL,
    STORE_CREATE_REQUEST,
    STORE_CREATE_SUCCESS,
    STORE_CREATE_FAIL,
    STORE_UPDATE_REQUEST,
    STORE_UPDATE_SUCCESS,
    STORE_UPDATE_FAIL,
    STORE_UPDATE_RESET,
    STORE_STATUS_REQUEST,
    STORE_STATUS_SUCCESS,
    STORE_STATUS_FAIL,
    
    } from "../constants/storeConstants"

    export const storeListReducer = (state = {stores: []}, action) => {
    switch(action.type){
        case STORE_LIST_REQUEST :
            return {loading: true, ...state}
        case STORE_LIST_SUCCESS :
            return {loading: false, success: true, stores: action.payload} 
        case STORE_LIST_FAIL : 
            return {loading: false, error: action.payload}
        default: 
            return state;
    }
}

export const storeCreateReducer = (state = {}, action) => {
    switch(action.type){
        case STORE_CREATE_REQUEST :
            return {loading: true}
        case STORE_CREATE_SUCCESS :
            return {loading: false, success: true, store: action.payload} 
        case STORE_CREATE_FAIL : 
            return {loading: false, error: action.payload}
        default: 
            return state;
    }
}

export const storeUpdateReducer = (state = {store:{}}, action) => {
    switch(action.type){
        case STORE_UPDATE_REQUEST :
            return {loading: true}
        case STORE_UPDATE_SUCCESS :
            return {loading: false, success: true, store: action.payload} 
        case STORE_UPDATE_FAIL : 
            return {loading: false, error: action.payload}
        case STORE_UPDATE_RESET : 
            return {store:{}}
        
        default: 
            return state;
    }
}
export const storeStatusChangeReducer = (state = {store:{}}, action) => {
    switch(action.type){
        case STORE_STATUS_REQUEST :
            return {loading: true}
        case STORE_STATUS_SUCCESS :
            return {loading: false, success: true, store: action.payload} 
        case STORE_STATUS_FAIL : 
            return {loading: false, error: action.payload}
        default: 
            return state;
    }
}


export const storeDetailsOwnerReducer = (state = {}, action) => {
    switch(action.type){
        case STORE_OWNER_DETAILS_REQUEST :
            console.log('I am from store owner details request')
            return {loading: true, store : {}}
            
        case STORE_OWNER_DETAILS_SUCCESS :
            console.log('I am from store reducers')
            console.log(action.payload)
            return {loading: false, success: true, store: action.payload} 
        case STORE_OWNER_DETAILS_FAIL : 
            return {loading: false, error: action.payload}
        default: 
            return state;
    }
}

export const storeDetailsReducer = (state = {store: {}}, action) => {
    switch(action.type){
        case STORE_DETAILS_REQUEST :
            return {loading: true, store : {}}
        case STORE_DETAILS_SUCCESS :
            console.log('I am from product reducers')
            console.log(action.payload)
            return {loading: false, store: action.payload} 
        case STORE_DETAILS_FAIL : 
            return {loading: false, error: action.payload}
        default: 
            return state;
    }
}
