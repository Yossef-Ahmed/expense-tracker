import {GET_MAIN_ALERT, CLEAR_MAIN_ALERT} from './types';

export const returnMainAlert = (type, msg) => {
    return {
        type: GET_MAIN_ALERT,
        payload: {msg, type}
    }
}

export const clearMainAlert = () => {
    return {
        type: CLEAR_MAIN_ALERT
    }
}