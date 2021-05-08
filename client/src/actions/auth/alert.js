import {SHOW_AUTH_ALERT, CLEAR_AUTH_ALERT} from '../types';

export const returnAlert = (type, msg) => {
    return {
        type: SHOW_AUTH_ALERT,
        payload: {type, msg}
    }
}

export const clearAlert = () => {
    return {
        type: CLEAR_AUTH_ALERT
    }
}