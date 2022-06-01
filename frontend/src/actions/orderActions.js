import axios from 'axios'
import thunk from 'redux-thunk'
import { 
        ORDER_CREATE_REQUEST, 
        ORDER_CREATE_SUCCESS, 
        ORDER_CREATE_FAIL,
        ORDER_LIST_REQUEST, 
        ORDER_LIST_SUCCESS, 
        ORDER_LIST_FAIL,
        ORDER_MY_LIST_REQUEST, 
        ORDER_MY_LIST_SUCCESS, 
        ORDER_MY_LIST_FAIL,
        ORDER_MY_UNPAID_LIST_REQUEST, 
        ORDER_MY_UNPAID_LIST_SUCCESS, 
        ORDER_MY_UNPAID_LIST_FAIL,
        ORDER_DETAILS_REQUEST, 
        ORDER_DETAILS_SUCCESS, 
        ORDER_DETAILS_FAIL,
        ORDER_DELIVER_REQUEST, 
        ORDER_DELIVER_SUCCESS, 
        ORDER_DELIVER_FAIL, 
        ORDER_DELIVER_RESET,  
        ORDER_PAY_REQUEST, 
        ORDER_PAY_SUCCESS, 
        ORDER_PAY_FAIL, 
        ORDER_PAY_RESET,
        ORDER_DISCARD_REQUEST,
        ORDER_DISCARD_SUCCESS,
        ORDER_DISCARD_FAIL,  
    } from "../constants/orderConstants"

    export const createOrder = (order) => async (dispatch, getState) => {
try{
    dispatch({type: ORDER_CREATE_REQUEST})

    const {
        userLogin: {userInfo}
    } = getState()

    const config = {
        headers: {
            'Content-Type' : 'application/json',
            Authorization: `Bearer ${userInfo.token}`
        }
    }
    const {data} = await axios.post(`/api/orders`, order, config)
    dispatch({type: ORDER_CREATE_SUCCESS, payload: data})

}catch(error){
    dispatch({
        type: ORDER_CREATE_FAIL,
        payload: 
        error.response && error.response.data.message ?
        error.response.data.message :
        error.message,
    })
    }
}

export const listOrders = () => async (dispatch, getState) => {
try{
    dispatch({type: ORDER_LIST_REQUEST})

    const {
        userLogin: {userInfo}
    } = getState()

    const config = {
        headers: {
            Authorization: `Bearer ${userInfo.token}`
        }
    }
    const {data} = await axios.get('/api/orders', config)
    dispatch({type: ORDER_LIST_SUCCESS, payload: data})

}catch(error){
    dispatch({
        type: ORDER_LIST_FAIL,
        payload: 
        error.response && error.response.data.message ?
        error.response.data.message :
        error.message,
    })
    }
}

export const listOrderDetails = (id) => async (dispatch) => {
try{
    dispatch({type: ORDER_DETAILS_REQUEST})
    const {data} = await axios.get(`/api/order/${id}`)
    dispatch({type: ORDER_DETAILS_SUCCESS, payload: data})

}catch(error){
    dispatch({
        type: ORDER_DETAILS_FAIL,
        payload: 
        error.response && error.response.data.message ?
        error.response.data.message :
        error.message,
    })
    }
}

export const getOrderDetails = (id) => async (dispatch, getState) => {
try{
    dispatch({type: ORDER_DETAILS_REQUEST})

    const {
        userLogin: {userInfo}
    } = getState()

    const config = {
        headers: {
                Authorization: `Bearer ${userInfo.token}`
        }
    }
    const {data} = await axios.get(`/api/orders/${id}`, config)
    dispatch({type: ORDER_DETAILS_SUCCESS, payload: data})

}catch(error){
    dispatch({
        type: ORDER_DETAILS_FAIL,
        payload: 
        error.response && error.response.data.message ?
        error.response.data.message :
        error.message,
    })
    }
}

export const deliverOrder = (order) => async (dispatch, getState) => {
try{
    dispatch({type: ORDER_DELIVER_REQUEST})

    const {
        userLogin: {userInfo}
    } = getState()

    const config = {
        headers: {
            Authorization: `Bearer ${userInfo.token}`
        }
    }
    const {data} = await axios.put(`/api/orders/${order._id}/deliver`, {}, config)
    dispatch({type: ORDER_DELIVER_SUCCESS, payload: data})

}catch(error){
    dispatch({
        type: ORDER_DELIVER_FAIL,
        payload: 
        error.response && error.response.data.message ?
        error.response.data.message :
        error.message,
    })
    }
}

export const payOrder = (order, paymentResult) => async (dispatch, getState) => {
try{
    dispatch({type: ORDER_PAY_REQUEST})

    const {
        userLogin: {userInfo}
    } = getState()

    const config = {
        headers: {
            'ContentType' : 'application/json',
            Authorization: `Bearer ${userInfo.token}`
        }
    }
    const {data} = await axios.put(`/api/orders/${order._id}/pay`, paymentResult, config)
    dispatch({type: ORDER_PAY_SUCCESS, payload: data})
}catch(error){
    dispatch({
        type: ORDER_PAY_FAIL,
        payload: 
        error.response && error.response.data.message ?
        error.response.data.message :
        error.message,
    })
    }
}

export const myOrdersList = () => async (dispatch, getState) => {
try{
    dispatch({type: ORDER_MY_LIST_REQUEST})

    const {
        userLogin: {userInfo}
    } = getState()

    const config = {
        headers: {
            Authorization: `Bearer ${userInfo.token}`
        }
    }
    const {data} = await axios.get(`/api/orders/myorders`, config)
    dispatch({type: ORDER_MY_LIST_SUCCESS, payload: data})
}catch(error){
    dispatch({
        type: ORDER_MY_LIST_FAIL,
        payload: 
        error.response && error.response.data.message ?
        error.response.data.message :
        error.message,
    })
    }
}

export const myUnpaidOrdersList = () => async (dispatch, getState) => {
try{
    dispatch({type: ORDER_MY_UNPAID_LIST_REQUEST})

    const {
        userLogin: {userInfo}
    } = getState()

    const config = {
        headers: {
            Authorization: `Bearer ${userInfo.token}`
        }
    }
    const {data} = await axios.get(`/api/orders/myunpaidorders`, config)
    dispatch({type: ORDER_MY_UNPAID_LIST_SUCCESS, payload: data})
}catch(error){
    dispatch({
        type: ORDER_MY_UNPAID_LIST_FAIL,
        payload: 
        error.response && error.response.data.message ?
        error.response.data.message :
        error.message,
    })
    }
}

export const discardOrder = (id) => async (dispatch, getState) => {
    try{
        dispatch({type: ORDER_DISCARD_REQUEST})

        const {
            userLogin: {userInfo}
        } = getState()

        const config = {
            headers: {
                Authorization : `Bearer ${userInfo.token}`
            }
        }
        await axios.delete(`/api/orders/${id}`, config)
        dispatch({type: ORDER_DISCARD_SUCCESS})
    }catch(error){
        dispatch({
            type: ORDER_DISCARD_FAIL,
            payload:
            error.response && error.response.data.message ?
            error.response.data.message : 
            error.response,
        })
    }
}