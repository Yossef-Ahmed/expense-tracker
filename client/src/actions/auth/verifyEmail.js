import axios from 'axios';
import {setConfig} from '../requestConfig';
import {loading, loaded} from '../loaderActions';
import {getCategories} from '../categoryActions';
import {returnAlert} from './alert';
import {returnMainAlert} from '../mainAlertActions';
import {closeEmailVerificationModal} from './toggleEmailVerification';
import {
    AUTH_ERROR,
    VERIFY_EMAIL
} from '../types';


export const verifyEmail = (email, verificationCode) => dispatch => {
    dispatch(loading());

    const config = setConfig();
    const body = JSON.stringify({email, verificationCode});

    axios.post('/api/auth/verify-email', body, config)
        .then(res => {
            dispatch(returnMainAlert('success', res.data.msg))
            dispatch(closeEmailVerificationModal());
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
            dispatch(returnAlert('danger', err.response.data.msg))
            dispatch({type: AUTH_ERROR});
            dispatch(loaded());
        })
}