import {combineReducers} from 'redux';
import authReducer from './authReducer';
import loaderReducer from './loaderReducer';
import mainAlertReducer from './mainAlertReducer';
import transactionReducer from './transactionReducer';
import categoryReducer from './categoryReducer';
import confirmReducer from './confirmReducer';

export default combineReducers({
    loader: loaderReducer,
    auth: authReducer,
    mainAlert: mainAlertReducer,
    transactions: transactionReducer,
    categories: categoryReducer,
    confirm: confirmReducer
});