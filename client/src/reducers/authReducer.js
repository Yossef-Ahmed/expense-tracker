import {
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    VERIFY_EMAIL,
    TOGGLE_EMAIL_VERIFICATION_MODAL,
    SHOW_AUTH_ALERT,
    CLEAR_AUTH_ALERT
} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    user: null,
    isEmailVerificationOpen: false,
    sendVerificationCodeNow: false,
    emailToVerify: null,
    alertMsg: null,
    alertType: null
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
        case VERIFY_EMAIL:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true
            }
        case TOGGLE_EMAIL_VERIFICATION_MODAL:
            return {
                ...state,
                ...action.payload,
                isEmailVerificationOpen: !state.isEmailVerificationOpen
            }
        case AUTH_ERROR:
        case LOGOUT_SUCCESS:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                user: null
            }
        case SHOW_AUTH_ALERT:
            return {
                ...state,
                alertMsg: action.payload.msg,
                alertType: action.payload.type
            }
        case CLEAR_AUTH_ALERT:
            return {
                ...state,
                alertMsg: null,
                alertType: null
            }
        default:
            return {
                ...state
            }
    }
}