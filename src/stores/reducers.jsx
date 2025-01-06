import { combineReducers } from 'redux';
import authReducer from './authSlice';
import productsReducer from './productsSlice';
import cartReducer from './cartSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  products: productsReducer,
  cart: cartReducer,
});

export default rootReducer;
