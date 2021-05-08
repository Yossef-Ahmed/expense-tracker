import {GET_MAIN_ALERT, CLEAR_MAIN_ALERT} from '../actions/types';

const initialState = {
    msg: null,
    type: null
}

export default function (state = initialState, action) {
    switch(action.type) {
        case GET_MAIN_ALERT:
            return {
                ...action.payload
            }
        case CLEAR_MAIN_ALERT:
            return {
                msg: null,
                type: null
            }
        default:
            return state;
    }
}