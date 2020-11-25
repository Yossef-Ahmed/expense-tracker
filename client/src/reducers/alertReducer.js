import {GET_ALERT, CLEAR_ALERT} from '../actions/types';

const initialState = {
    msg: null,
    status: null,
    className: null
}

export default function (state = initialState, action) {
    switch(action.type) {
        case GET_ALERT:
            return {
                msg: action.payload.msg,
                status: action.payload.status,
                className: action.payload.className
            }
        case CLEAR_ALERT:
            return {
                msg: null,
                status: null,
                className: null
            }
        default:
            return state;
    }
}