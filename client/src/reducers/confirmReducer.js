import {OPEN_CONFIRM, CLOSE_CONFIRM} from '../actions/types';

const initialState = {
    isOpen: false,
    answer: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case OPEN_CONFIRM:
            return {
                isOpen: true,
                answer: false
            }
        case CLOSE_CONFIRM:
            return {
                isOpen: false,
                answer: action.payload
            }
        default:
            return state;
    }
}