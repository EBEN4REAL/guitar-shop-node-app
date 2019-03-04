
import {combineReducers} from 'redux';
import user from '../reducers/user_reducer/user_reducer';
import products from '../reducers/products_reducer/product_reducer';

const rootReducer = combineReducers({
    products,
    user,
    
})

export default rootReducer;