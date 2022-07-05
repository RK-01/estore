import axios from 'axios'
import thunk from 'redux-thunk'
import { 
        SELLER_ORDER_CREATE_REQUEST, 
        SELLER_ORDER_CREATE_SUCCESS, 
        SELLER_ORDER_CREATE_FAIL,
        SELLER_ORDER_LIST_REQUEST, 
        SELLER_ORDER_LIST_SUCCESS, 
        SELLER_ORDER_LIST_FAIL,
        SELLER_ORDER_MY_LIST_REQUEST, 
        SELLER_ORDER_MY_LIST_SUCCESS, 
        SELLER_ORDER_MY_LIST_FAIL,
        SELLER_ORDER_MY_UNPAID_LIST_REQUEST, 
        SELLER_ORDER_MY_UNPAID_LIST_SUCCESS, 
        SELLER_ORDER_MY_UNPAID_LIST_FAIL,
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
    } from "../constants/sellerOrderConstants"

    export const createSellerOrder = (sellerOrder) => async (dispatch, getState) => {
try{
    dispatch({type: SELLER_ORDER_CREATE_REQUEST})

    const {
        userLogin: {userInfo}
    } = getState()

    const config = {
        headers: {
            'Content-Type' : 'application/json',
            Authorization: `Bearer ${userInfo.token}`
        }
    }
    console.log('I am in seller order action')
    console.log(sellerOrder)
    const {data} = await axios.post(`/api/seller-orders`, sellerOrder, config)
    dispatch({type: SELLER_ORDER_CREATE_SUCCESS, payload: data})

}catch(error){
    dispatch({
        type: SELLER_ORDER_CREATE_FAIL,
        payload: 
        error.response && error.response.data.message ?
        error.response.data.message :
        error.message,
    })
    }
}

export const listSellerOrders = () => async (dispatch, getState) => {
try{
    dispatch({type: SELLER_ORDER_LIST_REQUEST})

    const {
        userLogin: {userInfo}
    } = getState()

    const config = {
        headers: {
            Authorization: `Bearer ${userInfo.token}`
        }
    }
    const {data} = await axios.get('/api/seller-orders', config)
    dispatch({type: SELLER_ORDER_LIST_SUCCESS, payload: data})

}catch(error){
    dispatch({
        type: SELLER_ORDER_LIST_FAIL,
        payload: 
        error.response && error.response.data.message ?
        error.response.data.message :
        error.message,
    })
    }
}

export const listSellerOrderDetails = (id) => async (dispatch, getState) => {
try{
    dispatch({type: SELLER_ORDER_DETAILS_REQUEST})
    const {
        userLogin: {userInfo}
    } = getState()

    const config = {
        headers: {
                Authorization: `Bearer ${userInfo.token}`
        }
    }
    const {data} = await axios.get(`/api/seller-orders/${id}`, config)
    dispatch({type: SELLER_ORDER_DETAILS_SUCCESS, payload: data})

}catch(error){
    dispatch({
        type: SELLER_ORDER_DETAILS_FAIL,
        payload: 
        error.response && error.response.data.message ?
        error.response.data.message :
        error.message,
    })
    }
}

export const getSellerOrderDetails = (id) => async (dispatch, getState) => {
try{
    dispatch({type: SELLER_ORDER_DETAILS_REQUEST})

    const {
        userLogin: {userInfo}
    } = getState()

    const config = {
        headers: {
                Authorization: `Bearer ${userInfo.token}`
        }
    }
    console.log(id)
    const {data} = await axios.get(`/api/seller-orders/${id}`, config)
    dispatch({type: SELLER_ORDER_DETAILS_SUCCESS, payload: data})
    console.log(data)
}catch(error){
    dispatch({
        type: SELLER_ORDER_DETAILS_FAIL,
        payload: 
        error.response && error.response.data.message ?
        error.response.data.message :
        error.message,
    })
    }
}

export const deliverSellerOrder = (sellerOrder) => async (dispatch, getState) => {
try{
    dispatch({type: SELLER_ORDER_DELIVER_REQUEST})

    const {
        userLogin: {userInfo}
    } = getState()

    const config = {
        headers: {
            Authorization: `Bearer ${userInfo.token}`
        }
    }
    const {data} = await axios.put(`/api/seller-orders/${sellerOrder._id}/deliver`, {}, config)
    dispatch({type: SELLER_ORDER_DELIVER_SUCCESS, payload: data})

}catch(error){
    dispatch({
        type: SELLER_ORDER_DELIVER_FAIL,
        payload: 
        error.response && error.response.data.message ?
        error.response.data.message :
        error.message,
    })
    }
}

export const paySellerOrder = (sellerOrder, paymentResult) => async (dispatch, getState) => {
try{
    dispatch({type: SELLER_ORDER_PAY_REQUEST})

    const {
        userLogin: {userInfo}
    } = getState()

    const config = {
        headers: {
            'ContentType' : 'application/json',
            Authorization: `Bearer ${userInfo.token}`
        }
    }
    const {data} = await axios.put(`/api/seller-orders/${sellerOrder._id}/pay`, paymentResult, config)
    dispatch({type: SELLER_ORDER_PAY_SUCCESS, payload: data})
}catch(error){
    dispatch({
        type: SELLER_ORDER_PAY_FAIL,
        payload: 
        error.response && error.response.data.message ?
        error.response.data.message :
        error.message,
    })
    }
}

export const mySellerOrdersList = (storeId) => async (dispatch, getState) => {
try{
    dispatch({type: SELLER_ORDER_MY_LIST_REQUEST})

    const {
        userLogin: {userInfo}
    } = getState()

    const config = {
        headers: {
            Authorization: `Bearer ${userInfo.token}`
        }
    }
    const {data} = await axios.get(`/api/seller-orders/${storeId}/orders`, config)
    dispatch({type: SELLER_ORDER_MY_LIST_SUCCESS, payload: data})
}catch(error){
    dispatch({
        type: SELLER_ORDER_MY_LIST_FAIL,
        payload: 
        error.response && error.response.data.message ?
        error.response.data.message :
        error.message,
    })
    }
}

export const myUnpaidSellerOrdersList = () => async (dispatch, getState) => {
try{
    dispatch({type: SELLER_ORDER_MY_UNPAID_LIST_REQUEST})

    const {
        userLogin: {userInfo}
    } = getState()

    const config = {
        headers: {
            Authorization: `Bearer ${userInfo.token}`
        }
    }
    const {data} = await axios.get(`/api/seller-orders/myunpaidsellerorders`, config)
    dispatch({type: SELLER_ORDER_MY_UNPAID_LIST_SUCCESS, payload: data})
}catch(error){
    dispatch({
        type: SELLER_ORDER_MY_UNPAID_LIST_FAIL,
        payload: 
        error.response && error.response.data.message ?
        error.response.data.message :
        error.message,
    })
    }
}

export const discardSellerOrder = (id) => async (dispatch, getState) => {
    try{
        dispatch({type: SELLER_ORDER_DISCARD_REQUEST})

        const {
            userLogin: {userInfo}
        } = getState()

        const config = {
            headers: {
                Authorization : `Bearer ${userInfo.token}`
            }
        }
        await axios.delete(`/api/seller-orders/${id}`, config)
        dispatch({type: SELLER_ORDER_DISCARD_SUCCESS})
    }catch(error){
        dispatch({
            type: SELLER_ORDER_DISCARD_FAIL,
            payload:
            error.response && error.response.data.message ?
            error.response.data.message : 
            error.response,
        })
    }
}