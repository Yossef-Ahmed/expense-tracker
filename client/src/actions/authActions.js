import axios from 'axios';
import {setTokenAndConfig, setConfig} from './requestConfig';
import {loading, loaded} from './loaderActions';
import {getCategories} from './categoryActions';
import {
    USER_LOADED,
    AUTH_ERROR,
    LOGOUT_SUCCESS
} from './types';

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