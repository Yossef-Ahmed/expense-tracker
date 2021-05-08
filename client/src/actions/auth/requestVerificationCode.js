import axios from 'axios';
import {setConfig} from '../requestConfig';
import {returnAlert} from './alert';
import {AUTH_ERROR} from '../types';

export const requestVerificationCode = (email, sendVerificationCodeNow) => dispatch => {
    const config = setConfig();
    const body = JSON.stringify({email, sendVerificationCodeNow});

    axios.post('/api/auth/send-verification-code', body, config)
        .then(res => {
            dispatch(returnAlert('success', res.data.msg))
        })
        .catch(err => {
            dispatch(returnAlert('danger', err.response.data.msg))
            dispatch({type: AUTH_ERROR});
        })
}