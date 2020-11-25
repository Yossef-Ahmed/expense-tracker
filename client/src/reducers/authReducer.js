// Import Action Types
import {
    USER_LOADED,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,

} from '../actions/types';

// Initiate the initial state
const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    user: null
}

export default function(state = initialState, action) {
    switch(action.type) {
        case USER_LOADED:
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true
            }
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
            }
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGOUT_SUCCESS:
        case LOGIN_FAIL:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                user: null
            }
        default:
            return {
                ...state
            }
    }
}