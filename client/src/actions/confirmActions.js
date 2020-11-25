import {OPEN_CONFIRM, CLOSE_CONFIRM, SET_CONFIRM} from './types';

// Open Confirm Modal
export const openConfirm = () => dispatch => {
    dispatch({type: OPEN_CONFIRM});
}

// Close Confirm Modal
export const closeConfirm = answer => dispatch => {
    dispatch({
        type: CLOSE_CONFIRM,
        payload: answer
    });
}

// Set Confirm Answer Back To False
export const setConfirm = () => dispatch => {
    dispatch({type: SET_CONFIRM});
}