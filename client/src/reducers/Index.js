import {combineReducers} from 'redux';
import authReducer from './authReducer';
import loaderReducer from './loaderReducer';
import alertReducer from './alertReducer';
import transactionReducer from './transactionReducer';
import categoryReducer from './categoryReducer';
import confirmReducer from './confirmReducer';

export default combineReducers({
    loader: loaderReducer,
    auth: authReducer,
    alert: alertReducer,
    transactions: transactionReducer,
    categories: categoryReducer,
    confirm: confirmReducer
});