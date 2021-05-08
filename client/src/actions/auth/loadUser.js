import axios from 'axios';
import {setTokenAndConfig} from '../requestConfig';
import {loading, loaded} from '../loaderActions';
import {getCategories} from '../categoryActions';
import {
    USER_LOADED,
    AUTH_ERROR
} from '../types';

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