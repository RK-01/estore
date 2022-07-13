import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { productListByCategoryReducer, productAddStoreReducer, productAddCategoryReducer, productDetailsReducer, productListReducer, productDeleteReducer, productCreateReducer, productUpdateReducer, productCreateReviewReducer, searchProductListReducer, productListByStoreReducer } from './reducers/productReducers'
import {cartReducer} from './reducers/cartReducers'
import {userLoginReducer, userRegisterReducer, userDetailsReducer, userListReducer, userDeleteReducer, userStatusChangeReducer} from './reducers/userReducers'
import { orderListReducer, orderCreateReducer, orderDetailsReducer, orderDeliverReducer, orderPayReducer, orderMyListReducer, orderMyUnpaidListReducer, orderDiscardReducer } from './reducers/orderReducers'
import { sellerOrderListReducer, sellerOrderCreateReducer, sellerOrderDetailsReducer, sellerOrderDeliverReducer, sellerOrderMyListReducer, sellerOrderMyUnpaidListReducer, sellerOrderDiscardReducer } from './reducers/sellerOrderReducers'
import { bannerListReducer, bannerCreateReducer, bannerDetailsReducer, bannerUpdateReducer, bannerDeleteReducer} from './reducers/bannerReducers'
import { categoryDetailsReducer, categoryListReducer, categoryDeleteReducer, categoryCreateReducer, categoryUpdateReducer, addProductToCategoryReducer } from './reducers/categoryReducers'
import { storeListReducer, storeCreateReducer, storeDetailsOwnerReducer, storeDetailsReducer, storeUpdateReducer,storeStatusChangeReducer} from './reducers/storeReducers'
import { contactDetailsReducer, contactListReducer, contactDeleteReducer, contactCreateReducer } from './reducers/contactReducers'


const reducer = combineReducers({
    productList : productListReducer,
    searchProductList : searchProductListReducer,
    productDetails : productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    orderList: orderListReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userStatusChange: userStatusChangeReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderDeliver: orderDeliverReducer,
    orderPay: orderPayReducer,
    bannerCreate: bannerCreateReducer,
    bannerList: bannerListReducer, 
    bannerUpdate: bannerUpdateReducer,
    bannerDetails: bannerDetailsReducer,
    bannerDelete: bannerDeleteReducer,
    orderMyList: orderMyListReducer,
    orderMyUnpaidList: orderMyUnpaidListReducer,
    orderDiscard: orderDiscardReducer,
    
    productCreateReview: productCreateReviewReducer,
    productAddCategory: productAddCategoryReducer,
    productAddStore: productAddStoreReducer,
    productListByCategory: productListByCategoryReducer,
    productListByStore: productListByStoreReducer,

    categoryDelete: categoryDeleteReducer,
    categoryCreate: categoryCreateReducer,
    categoryUpdate: categoryUpdateReducer,
    categoryList : categoryListReducer,
    categoryDetails : categoryDetailsReducer,
    addProductToCategory : addProductToCategoryReducer,
    
    storeList : storeListReducer,
    storeCreate : storeCreateReducer,
    storeDetailsOwner : storeDetailsOwnerReducer,
    storeUpdate: storeUpdateReducer,
    storeDetails: storeDetailsReducer,
    storeStatusChange: storeStatusChangeReducer,

    sellerOrderCreate: sellerOrderCreateReducer,
    sellerOrderDetails: sellerOrderDetailsReducer,
    sellerOrderDeliver: sellerOrderDeliverReducer,
    sellerOrderList: sellerOrderListReducer,
    sellerOrderMyList : sellerOrderMyListReducer,

    //contact reducers
    contactDetails: contactDetailsReducer, 
    contactList: contactListReducer, 
    contactDelete: contactDeleteReducer, 
    contactCreate: contactCreateReducer
    
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ?
    JSON.parse(localStorage.getItem('cartItems'))
    : []

const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo'))
    : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ?
    JSON.parse(localStorage.getItem('shippingAddress'))
    : {}

const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage,
    },
    userLogin: {
        userInfo: userInfoFromStorage,
    },
}
const middleware = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;