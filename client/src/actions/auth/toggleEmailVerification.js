import {requestVerificationCode} from './requestVerificationCode';
import {TOGGLE_EMAIL_VERIFICATION_MODAL} from '../types';

export const openEmailVerificationModal = (emailToVerify, sendVerificationCodeNow = false) => dispatch => {
    dispatch({
        type: TOGGLE_EMAIL_VERIFICATION_MODAL,
        payload: {
            emailToVerify,
            sendVerificationCodeNow
        }
    })
    dispatch(requestVerificationCode(emailToVerify, sendVerificationCodeNow))
}

export const closeEmailVerificationModal = () => dispatch => {
    dispatch({
        type: TOGGLE_EMAIL_VERIFICATION_MODAL,
        payload: {
            emailToVerify: null,
            sendVerificationCodeNow: false
        }
    })
}