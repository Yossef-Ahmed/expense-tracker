import {OPEN_CONFIRM, CLOSE_CONFIRM} from './types';

export const openConfirm = () => dispatch => {
    dispatch({type: OPEN_CONFIRM});
}

export const closeConfirm = answer => dispatch => {
    dispatch({
        type: CLOSE_CONFIRM,
        payload: answer
    });
}