import { 
    PRODUCT_LIST_REQUEST, 
    PRODUCT_LIST_SUCCESS, 
    PRODUCT_LIST_FAIL, 
    PRODUCT_DETAILS_REQUEST, 
    PRODUCT_DETAILS_SUCCESS, 
    PRODUCT_DETAILS_FAIL, 
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_UPDATE_RESET,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_CREATE_REVIEW_RESET,
    PRODUCT_ADD_CATEGORY_REQUEST,
    PRODUCT_ADD_CATEGORY_SUCCESS,
    PRODUCT_ADD_CATEGORY_FAIL,
    PRODUCT_ADD_CATEGORY_RESET,
    PRODUCT_LIST_BY_CATEGORY_SUCCESS, 
    PRODUCT_LIST_BY_CATEGORY_REQUEST,
    PRODUCT_LIST_BY_CATEGORY_FAIL,   
    PRODUCT_SEARCH_REQUEST,
    PRODUCT_SEARCH_SUCCESS,
    PRODUCT_SEARCH_FAIL,
    PRODUCT_SEARCH_RESET,
    PRODUCT_ADD_STORE_REQUEST,
    PRODUCT_ADD_STORE_SUCCESS,
    PRODUCT_ADD_STORE_FAIL,
    PRODUCT_ADD_STORE_RESET,
    PRODUCT_LIST_BY_STORE_SUCCESS, 
    PRODUCT_LIST_BY_STORE_REQUEST,
    PRODUCT_LIST_BY_STORE_FAIL,   
    
    
    } from "../constants/productConstants"
export const productListReducer = (state = {products: []}, action) => {
    switch(action.type){
        case PRODUCT_LIST_REQUEST :
            return {loading: true, ...state}
        case PRODUCT_LIST_SUCCESS :
            return {loading: false, success: true, products: action.payload} 
        case PRODUCT_LIST_FAIL : 
            return {loading: false, error: action.payload}
        default: 
            return state;
    }
}

export const searchProductListReducer = (state = {products: []}, action) => {
    switch(action.type){
        case PRODUCT_SEARCH_REQUEST :
            return {loading: true, ...state}
        case PRODUCT_SEARCH_SUCCESS :
            return {loading: false, products: action.payload} 
        case PRODUCT_SEARCH_FAIL : 
            return {loading: false, error: action.payload}
        default: 
            return state;
    }
}

export const productListByCategoryReducer = (state = {products: []}, action) => {
    switch(action.type){
        case PRODUCT_LIST_BY_CATEGORY_REQUEST :
            return {loading: true, ...state}
        case PRODUCT_LIST_BY_CATEGORY_SUCCESS :
            return {loading: false, success: true, products: action.payload.products, pages: action.payload.pages,page: action.payload.page} 
        case PRODUCT_LIST_BY_CATEGORY_FAIL : 
            return {loading: false, error: action.payload}
        default: 
            return state;
    }
}
export const productListByStoreReducer = (state = {products: []}, action) => {
    switch(action.type){
        case PRODUCT_LIST_BY_STORE_REQUEST :
            return {loading: true, ...state}
        case PRODUCT_LIST_BY_STORE_SUCCESS :
            return {loading: false, success: true, products: action.payload.products, pages: action.payload.pages,page: action.payload.page} 
        case PRODUCT_LIST_BY_STORE_FAIL : 
            return {loading: false, error: action.payload}
        default: 
            return state;
    }
}

export const productDetailsReducer = (state = {product: { reviews:[]}}, action) => {
    switch(action.type){
        case PRODUCT_DETAILS_REQUEST :
            return {loading: true, product : {}}
        case PRODUCT_DETAILS_SUCCESS :
            console.log('I am from product reducers')
            console.log(action.payload)
            return {loading: false, product: action.payload} 
        case PRODUCT_DETAILS_FAIL : 
            return {loading: false, error: action.payload}
        default: 
            return state;
    }
}

export const productDeleteReducer = (state = {}, action) => {
    switch(action.type){
        case PRODUCT_DELETE_REQUEST :
            return {loading: true}
        case PRODUCT_DELETE_SUCCESS :
            return {loading: false, success: true} 
        case PRODUCT_DELETE_FAIL : 
            return {loading: false, error: action.payload}
        default: 
            return state;
    }
}

export const productCreateReducer = (state = {}, action) => {
    switch(action.type){
        case PRODUCT_CREATE_REQUEST :
            return {loading: true}
        case PRODUCT_CREATE_SUCCESS :
            return {loading: false, success: true, product: action.payload} 
        case PRODUCT_CREATE_FAIL : 
            return {loading: false, error: action.payload}
        default: 
            return state;
    }
}

export const productUpdateReducer = (state = {product:{}}, action) => {
    switch(action.type){
        case PRODUCT_UPDATE_REQUEST :
            return {loading: true}
        case PRODUCT_UPDATE_SUCCESS :
            return {loading: false, success: true, product: action.payload} 
        case PRODUCT_UPDATE_FAIL : 
            return {loading: false, error: action.payload}
        case PRODUCT_UPDATE_RESET : 
            return {product:{}}
        
        default: 
            return state;
    }
}

export const productCreateReviewReducer = (state = {}, action) => {
    switch(action.type){
        case PRODUCT_CREATE_REVIEW_REQUEST :
            return {loading: true}
        case PRODUCT_CREATE_REVIEW_SUCCESS :
            return {loading: false, success: true} 
        case PRODUCT_CREATE_REVIEW_FAIL : 
            return {loading: false, error: action.payload}
        case PRODUCT_CREATE_REVIEW_RESET : 
            return {}
        
        default: 
            return state;
    }
}

export const productAddCategoryReducer = (state = {}, action) => {
    switch(action.type){
        case PRODUCT_ADD_CATEGORY_REQUEST :
            return {loading: true}
        case PRODUCT_ADD_CATEGORY_SUCCESS :
            return {loading: false, success: true} 
        case PRODUCT_ADD_CATEGORY_FAIL : 
            return {loading: false, error: action.payload}
        case PRODUCT_ADD_CATEGORY_RESET : 
            return {}
        
        default: 
            return state;
    }
}

export const productAddStoreReducer = (state = {}, action) => {
    switch(action.type){
        case PRODUCT_ADD_STORE_REQUEST :
            return {loading: true}
        case PRODUCT_ADD_STORE_SUCCESS :
            return {loading: false, success: true} 
        case PRODUCT_ADD_STORE_FAIL : 
            return {loading: false, error: action.payload}
        case PRODUCT_ADD_STORE_RESET : 
            return {}
        
        default: 
            return state;
    }
}
