import {LOADING, LOADED} from '../actions/types';

const initialSatet = {
    isLoading: false
}

export default function(state = initialSatet, action) {
    switch(action.type) {
        case LOADING:
            return {
                ...state,
                isLoading: true
            }
        case LOADED:
            return {
                ...state,
                isLoading: false
            }
        default:
            return {
                ...state
            }
    }
}