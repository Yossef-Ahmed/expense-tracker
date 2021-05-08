import axios from 'axios';
import {setConfig} from '../requestConfig';
import {loading, loaded} from '../loaderActions';
import {getCategories} from '../categoryActions';
import {returnAlert} from './alert';
import {returnMainAlert} from '../mainAlertActions';
import {openEmailVerificationModal} from './toggleEmailVerification';
import {
    AUTH_ERROR,
    LOGIN_SUCCESS
} from '../types';

export const login = ({email, password}) => dispatch => {
    dispatch(loading());
    
    const config = setConfig();
    const body = JSON.stringify({email, password});
    
    axios.post('/api/auth/login', body, config)
        .then(res => {
            if (!res.data.userActive) {
                dispatch(returnAlert('danger', res.data.msg))
                setTimeout(() => dispatch(openEmailVerificationModal(res.data.email)), 1000)
            } else {
                dispatch(returnMainAlert('success', "Logged In Successfully"))
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
            dispatch(returnAlert('danger', err.response.data.msg))
            dispatch({type: AUTH_ERROR});
            dispatch(loaded());
        });
}