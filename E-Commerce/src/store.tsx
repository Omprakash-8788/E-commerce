import { applyMiddleware, combineReducers, configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { productDetailsReducer, productReducer } from './reducers/reducer';
import { registerReduer, userReducer } from './reducers/userReducer';



const reducer = combineReducers({
    products: productReducer,
    productDetails:productDetailsReducer,
    user: userReducer,
    
  
    
  });
// let initialState = {}
// const middleware = [thunk]

const store= configureStore({
    reducer,
    // initialState,
    // composeWithDevTools(applyMiddleware(...middleware))
})

export default store;