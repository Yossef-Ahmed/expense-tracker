import {
    GET_CATEGORIES,
    GET_CATEGORY,
    CREATE_CATEGORY,
    UPDATE_CATEGORY,
    DELETE_CATEGORY,
    CLOSE_CATEGORY_DETAILS,
    UNLOAD_CATEGORIES
} from '../actions/types';

const initialState = {
    items: [],
    item: null
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_CATEGORIES: 
            return {
                ...state,
                items: action.payload
            }
        case GET_CATEGORY:
            return {
                ...state,
                item: action.payload
            }
        case CLOSE_CATEGORY_DETAILS:
        case UNLOAD_CATEGORIES:
            return {
                ...state,
                item: null
            }
        case CREATE_CATEGORY:
            return {
                ...state,
                items: [action.payload, ...state.items]
            }
        case UPDATE_CATEGORY:
            return {
                ...state,
                items: [...state.items.filter(item => item._id !== action.payload._id), action.payload],
                item: null
            }
        case DELETE_CATEGORY:
            return {
                ...state,
                items: state.items.filter(item => item._id !== action.payload),
                item: null
            }
        default:
            return state;
    }
}