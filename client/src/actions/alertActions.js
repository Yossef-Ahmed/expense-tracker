import {GET_ALERT, CLEAR_ALERT} from './types';

// Get the alert
export const returnAlert = (msg, status, className) => {
    return {
        type: GET_ALERT,
        payload: {msg, status, className}
    }
}

// Clear the alerts
export const clearAlert = () => {
    return {
        type: CLEAR_ALERT
    }
}