import axios from 'axios'
import thunk from 'redux-thunk'
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

    export const listStores = () => async (dispatch) => {
try{
    dispatch({type: STORE_LIST_REQUEST})
    const {data} = await axios.get('/api/stores')
    dispatch({type: STORE_LIST_SUCCESS, payload: data})

}catch(error){
    dispatch({
        type: STORE_LIST_FAIL,
        payload: 
        error.response && error.response.data.message ?
        error.response.data.message :
        error.message,
    })
    }
}

export const deleteStore = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: STORE_DELETE_REQUEST
        })
        const {
            userLogin: {userInfo}
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            }
        }
        await axios.delete(`/api/stores/${id}`, config)
        dispatch({
            type: STORE_DELETE_SUCCESS,
        })
    } catch (error) {
        dispatch({
        type: STORE_DELETE_FAIL,
        payload: 
        error.response && error.response.data.message ?
        error.response.data.message :
        error.message,
    })
    }
}

export const createStore = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: STORE_CREATE_REQUEST
        })
        const {
            userLogin: {userInfo}
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            }
        }
        const {data} = await axios.post(`/api/stores`, {userInfo}, config)
        dispatch({
            type: STORE_CREATE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
        type: STORE_CREATE_FAIL,
        payload: 
        error.response && error.response.data.message ?
        error.response.data.message :
        error.message,
    })
    }
}

export const updateStore = (store) => async (dispatch, getState) => {
    try {
        dispatch({
            type: STORE_UPDATE_REQUEST
        })
        const {
            userLogin: {userInfo}
        } = getState()

        const config = {
            headers: {
                'Content-Type' : 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }
        const {data} = await axios.put(`/api/stores/${store._id}`, store, config)
        dispatch({
            type: STORE_UPDATE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
        type: STORE_UPDATE_FAIL,
        payload: 
        error.response && error.response.data.message ?
        error.response.data.message :
        error.message,
    })
    }
}

export const changeStatus = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: STORE_STATUS_REQUEST
        })
        const {
            userLogin: {userInfo}
        } = getState()

        const config = {
            headers: {
                'Content-Type' : 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }
        const {data} = await axios.put(`/api/stores/${id}/status`, {}, config)
        dispatch({
            type: STORE_STATUS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
        type: STORE_STATUS_FAIL,
        payload: 
        error.response && error.response.data.message ?
        error.response.data.message :
        error.message,
    })
    }
}

export const storeOwnerDetails = () => async (dispatch, getState) => {
try{
    
    dispatch({type: STORE_OWNER_DETAILS_REQUEST})
    const {
            userLogin: {userInfo}
        } = getState()
    console.log(userInfo._id)

    const {data} = await axios.get(`/api/stores/${userInfo._id}/stores`)
    console.log(data)
    dispatch({type: STORE_OWNER_DETAILS_SUCCESS, payload: data})

}catch(error){
    dispatch({
        type: STORE_OWNER_DETAILS_FAIL,
        payload: 
        error.response && error.response.data.message ?
        error.response.data.message :
        error.message,
    })
    }
}

export const listStoreDetails = (storeId) => async (dispatch) => {
try{
    dispatch({type: STORE_DETAILS_REQUEST})
    const {data} = await axios.get(`/api/stores/${storeId}`)
    dispatch({type: STORE_DETAILS_SUCCESS, payload: data})

}catch(error){
    dispatch({
        type: STORE_DETAILS_FAIL,
        payload: 
        error.response && error.response.data.message ?
        error.response.data.message :
        error.message,
    })
    }
}


