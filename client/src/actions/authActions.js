import axios from 'axios';
import {returnAlert} from './alertActions';
import {loading, loaded} from './loaderActions';
import {getCategories} from './categoryActions';
import {
    USER_LOADED,
    AUTH_ERROR,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS
} from './types';

// Register User
export const register = ({name, email, password}) => dispatch => {
    // Laoding 
    dispatch(loading());
    // Set the Headers
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }
    // Set the Body
    const body = JSON.stringify({name, email, password});
    // Send the Request
    axios.post('/api/auth/register', body, config)
        .then(res => {
            dispatch(returnAlert('Register Successfully', 'Success!', 'success'));
            dispatch(getCategories(res.data.categories));
            dispatch({
                type: REGISTER_SUCCESS,
                payload: {
                    token: res.data.token,
                    user: res.data.user
                }
            });
        })
        .catch(err => {
            dispatch(returnAlert(err.response.data.msg, 'Error!', 'danger'));
            dispatch({type: REGISTER_FAIL});
            dispatch(loaded());
        });
}

// Login
export const login = ({email, password}) => dispatch => {
    // Laoding 
    dispatch(loading());
    // Set the Headers
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }
    // Set the Body
    const body = JSON.stringify({email, password});
    // Send the Request
    axios.post('/api/auth/login', body, config)
        .then(res => {
            dispatch(returnAlert('Login Successfully', 'Success!', 'success'));
            dispatch(getCategories(res.data.categories));
            dispatch({
                type: LOGIN_SUCCESS,
                payload: {
                    token: res.data.token,
                    user: res.data.user
                }
            });
        })
        .catch(err => {
            dispatch(returnAlert(err.response.data.msg, 'Error!', 'danger'));
            dispatch({type: LOGIN_FAIL});
            dispatch(loaded());
        });
}

// Logout
export const logout = () => dispatch => {
    dispatch(returnAlert('Logout Successfully', 'Success!', 'success'));
    dispatch({type: LOGOUT_SUCCESS});
}

// Check token & load user
export const loadUser = () => (dispatch, getState) => {
    // User Loadding
    dispatch(loading());
    axios.get('/api/auth/user', tokenConfig(getState))
        .then(res => {
            dispatch(getCategories(res.data.categories));
            dispatch({
                type: USER_LOADED,
                payload: {
                    token: res.data.token,
                    user: res.data.user
                }
            });
        })
        .catch(err => {
            dispatch({type: AUTH_ERROR});
            dispatch(loaded());
        });
};

// Setup config/headers and token
export const tokenConfig = getState => {
    // Get token from localStorage
    const token = getState().auth.token;
    // Headers
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }
    // If token, add to headers
    if (token) {
        config.headers['x-auth-token'] = token;
    }
    return config;
}