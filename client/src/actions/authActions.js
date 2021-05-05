import axios from 'axios';
import {setTokenAndConfig, setConfig} from './requestConfig';
import {loading, loaded} from './loaderActions';
import {getCategories} from './categoryActions';
import {
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    VERIFY_EMAIL,
    TOGGLE_EMAIL_VERIFICATION_MODAL,
    LOGOUT_SUCCESS
} from './types';

export const register = ({name, email, password}) => dispatch => { 
    dispatch(loading());
    
    const config = setConfig();
    const body = JSON.stringify({name, email, password});
    
    axios.post('/api/auth/register', body, config)
        .then(res => {
            dispatch(toggleEmailVerificationModal(res.data.email))
            dispatch(loaded());
        })
        .catch(err => {
            dispatch({type: AUTH_ERROR});
            dispatch(loaded());
        });
}

export const login = ({email, password}) => dispatch => {
    dispatch(loading());
    
    const config = setConfig();
    const body = JSON.stringify({email, password});
    
    axios.post('/api/auth/login', body, config)
        .then(res => {
            if (!res.data.userActive) {
                dispatch(toggleEmailVerificationModal(res.data.email));
            } else {
                dispatch(getCategories(res.data.categories));
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: {
                        token: res.data.token,
                        user: res.data.user
                    }
                });
            }

            dispatch(loaded());
        })
        .catch(err => {
            dispatch({type: AUTH_ERROR});
            dispatch(loaded());
        });
}

export const toggleEmailVerificationModal = (emailToVerify, sendVerificationCodeNow = false) => dispatch => {
    dispatch({
        type: TOGGLE_EMAIL_VERIFICATION_MODAL,
        payload: {
            emailToVerify,
            sendVerificationCodeNow
        }
    })
    dispatch(requestVerificationCode(emailToVerify, sendVerificationCodeNow))
}

export const requestVerificationCode = (email, sendVerificationCodeNow) => dispatch => {
    const config = setConfig();
    const body = JSON.stringify({email, sendVerificationCodeNow});

    axios.post('/api/auth/send-verification-code', body, config)
        .then(res => {
            console.log(res.data.msg);
        })
        .catch(err => {
            console.log(err);
            dispatch({type: AUTH_ERROR});
        })
}

export const verifyEmail = (email, verificationCode) => dispatch => {
    dispatch(loading());

    const config = setConfig();
    const body = JSON.stringify({email, verificationCode});

    axios.post('/api/auth/verify-email', body, config)
        .then(res => {
            dispatch(toggleEmailVerificationModal(null, false));
            dispatch(getCategories(res.data.categories));
            dispatch({
                type: VERIFY_EMAIL,
                payload: {
                    token: res.data.token,
                    user: res.data.user
                }
            });
            dispatch(loaded());
        })
        .catch(err => {
            console.log(err);
            dispatch({type: AUTH_ERROR});
            dispatch(loaded());
        })
}


export const logout = () => dispatch => {
    dispatch(loading());
    setTimeout(() => {
        dispatch({type: LOGOUT_SUCCESS});
        dispatch(loaded());
    }, 500);
}

export const loadUser = () => (dispatch, getState) => {
    dispatch(loading());

    axios.get('/api/auth/load-user', setTokenAndConfig(getState))
        .then(res => {
            dispatch(getCategories(res.data.categories));
            dispatch({
                type: USER_LOADED,
                payload: {
                    token: res.data.token,
                    user: res.data.user
                }
            });
            dispatch(loaded());
        })
        .catch(err => {
            dispatch({type: AUTH_ERROR});
            dispatch(loaded());
        });
};