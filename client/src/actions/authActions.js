import axios from 'axios';
import {setTokenAndConfig, setConfig} from './requestConfig';
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

export const register = ({name, email, password}) => dispatch => { 
    dispatch(loading());
    
    const config = setConfig();
    const body = JSON.stringify({name, email, password});
    
    axios.post('/api/auth/register', body, config)
        .then(res => {
            dispatch(getCategories(res.data.categories));
            dispatch({
                type: REGISTER_SUCCESS,
                payload: {
                    token: res.data.token,
                    user: res.data.user
                }
            });
            dispatch(loaded());
        })
        .catch(err => {
            dispatch({type: REGISTER_FAIL});
            dispatch(loaded());
        });
}

export const login = ({email, password}) => dispatch => {
    dispatch(loading());
    
    const config = setConfig();
    const body = JSON.stringify({email, password});
    
    axios.post('/api/auth/login', body, config)
        .then(res => {
            dispatch(getCategories(res.data.categories));
            dispatch({
                type: LOGIN_SUCCESS,
                payload: {
                    token: res.data.token,
                    user: res.data.user
                }
            });
            dispatch(loaded());
        })
        .catch(err => {
            dispatch({type: LOGIN_FAIL});
            dispatch(loaded());
        });
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