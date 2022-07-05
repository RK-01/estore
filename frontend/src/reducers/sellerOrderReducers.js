import { 
    SELLER_ORDER_LIST_REQUEST,
    SELLER_ORDER_LIST_SUCCESS,
    SELLER_ORDER_LIST_FAIL,
    SELLER_ORDER_MY_LIST_REQUEST,
    SELLER_ORDER_MY_LIST_SUCCESS,
    SELLER_ORDER_MY_LIST_FAIL,
    SELLER_ORDER_MY_UNPAID_LIST_REQUEST,
    SELLER_ORDER_MY_UNPAID_LIST_SUCCESS,
    SELLER_ORDER_MY_UNPAID_LIST_FAIL,
    SELLER_ORDER_CREATE_REQUEST,
    SELLER_ORDER_CREATE_SUCCESS,
    SELLER_ORDER_CREATE_FAIL,
    SELLER_ORDER_DETAILS_REQUEST,
    SELLER_ORDER_DETAILS_SUCCESS,
    SELLER_ORDER_DETAILS_FAIL,
    SELLER_ORDER_DELIVER_REQUEST,
    SELLER_ORDER_DELIVER_SUCCESS,
    SELLER_ORDER_DELIVER_FAIL,
    SELLER_ORDER_DELIVER_RESET,
    SELLER_ORDER_PAY_REQUEST,
    SELLER_ORDER_PAY_SUCCESS,
    SELLER_ORDER_PAY_FAIL,
    SELLER_ORDER_PAY_RESET,
    SELLER_ORDER_DISCARD_REQUEST,
    SELLER_ORDER_DISCARD_SUCCESS,
    SELLER_ORDER_DISCARD_FAIL,
    
    } from "../constants/sellerOrderConstants.js"

    export const sellerOrderListReducer = (state = {sellerOrders:[]}, action) => {
    switch(action.type){
        case SELLER_ORDER_LIST_REQUEST :
            return {loading: true}
        case SELLER_ORDER_LIST_SUCCESS :
            return {loading: false, sellerOrders: action.payload} 
        case SELLER_ORDER_LIST_FAIL : 
            return {loading: false, error: action.payload}
        default: 
            return state;
    }
}

export const sellerOrderCreateReducer = (state = {}, action) => {
    switch(action.type){
        case SELLER_ORDER_CREATE_REQUEST :
            return {loading: true}
        case SELLER_ORDER_CREATE_SUCCESS :
            return {loading: false, success: true, sellerOrder: action.payload} 
        case SELLER_ORDER_CREATE_FAIL : 
            return {loading: false, error: action.payload}
        default: 
            return state;
    }
}

export const sellerOrderDetailsReducer = (state = {}, action) => {
    switch(action.type){
        case SELLER_ORDER_DETAILS_REQUEST :
            return {loading: true, success: false, order : {}}
        case SELLER_ORDER_DETAILS_SUCCESS :
            return {loading: false, success: true, order: action.payload} 
        case SELLER_ORDER_DETAILS_FAIL : 
            return {loading: false, error: action.payload}
        default: 
            return state;
    }
}

export const sellerOrderDeliverReducer = (state = {}, action) => {
    switch(action.type){
        case SELLER_ORDER_DELIVER_REQUEST :
            return {loading: true}
        case SELLER_ORDER_DELIVER_SUCCESS :
            return {loading: false, success: true} 
        case SELLER_ORDER_DELIVER_FAIL : 
            return {loading: false, error: action.payload}
        case SELLER_ORDER_DELIVER_RESET:
            return {}
        default: 
            return state;
    }
}

export const sellerOrderPayReducer = (state = {}, action) => {
    switch(action.type){
        case SELLER_ORDER_PAY_REQUEST :
            return {loading: true}
        case SELLER_ORDER_PAY_SUCCESS :
            return {loading: false, success: true} 
        case SELLER_ORDER_PAY_FAIL : 
            return {loading: false, error: action.payload}
        case SELLER_ORDER_PAY_RESET:
            return {}
        default: 
            return state;
    }
}

export const sellerOrderMyListReducer = (state = {sellerOrders: []}, action) => {
    switch(action.type){
        case SELLER_ORDER_MY_LIST_REQUEST :
            return {loading: true}
        case SELLER_ORDER_MY_LIST_SUCCESS :
            console.log(action.payload)
            return {loading: false, sellerOrders: action.payload} 
        case SELLER_ORDER_MY_LIST_FAIL : 
            return {loading: false, error: action.payload}
        default: 
            return state;
    }
}

export const sellerOrderMyUnpaidListReducer = (state = {sellerOrders: []}, action) => {
    switch(action.type){
        case SELLER_ORDER_MY_UNPAID_LIST_REQUEST :
            return {loading: true}
        case SELLER_ORDER_MY_UNPAID_LIST_SUCCESS :
            return {loading: false, sellerOrders: action.payload} 
        case SELLER_ORDER_MY_UNPAID_LIST_FAIL : 
            return {loading: false, error: action.payload}
        default: 
            return state;
    }
}

export const sellerOrderDiscardReducer = (state = {}, action) => {
    switch(action.type){
        case SELLER_ORDER_DISCARD_REQUEST :
            return {loading: true}
        case SELLER_ORDER_DISCARD_SUCCESS :
            return {loading: false, success: true} 
        case SELLER_ORDER_DISCARD_FAIL : 
            return {loading: false, error: action.payload}
        default: 
            return state;
    }
}
