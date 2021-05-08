import axios from 'axios';
import {setConfig} from '../requestConfig';
import {loading, loaded} from '../loaderActions';
import {returnAlert} from './alert';
import {openEmailVerificationModal} from './toggleEmailVerification';
import {AUTH_ERROR} from '../types';

export const register = ({name, email, password}) => dispatch => { 
    dispatch(loading());
    
    const config = setConfig();
    const body = JSON.stringify({name, email, password});
    
    axios.post('/api/auth/register', body, config)
        .then(res => {
            dispatch(returnAlert('success', res.data.msg))
            setTimeout(() => dispatch(openEmailVerificationModal(res.data.email)), 1000)
            dispatch(loaded());
        })
        .catch(err => {
            dispatch(returnAlert('danger', err.response.data.msg))
            dispatch({type: AUTH_ERROR});
            dispatch(loaded());
        });
}