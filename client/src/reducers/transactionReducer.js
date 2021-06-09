import {
    GET_TRANSACTIONS,
    GET_TRANSACTION,
    CREATE_TRANSACTION,
    DELETE_TRANSACTION,
    UPDATE_TRANSACTION,
    CLOSE_TRANSACTION_DETAILS,
    CHANGE_CURR_MONTH,
    GET_DAY_TRANSACTIONS,
    CLOSE_DAY_TRANSACTIONS
} from '../actions/types';

const initialState = {
    items: [],
    item: null,
    start: null,
    end: null,
    dayTransactions: {}
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_TRANSACTIONS:
            return {
                ...state,
                items: action.payload
            }
        case CHANGE_CURR_MONTH:
            return {
                ...state,
                start: action.payload.start,
                end: action.payload.end
            }
        case GET_TRANSACTION:
            return {
                ...state,
                item: action.payload
            }
        case CLOSE_TRANSACTION_DETAILS:
            return {
                ...state,
                item: null
            }
        case CREATE_TRANSACTION:
            const tranDate = new Date(parseInt(action.payload.date));
            let start = new Date(new Date(state.start).setDate(state.start.getDate() - 1));
            let end = new Date(state.end);
            if ((state.end && tranDate > start && tranDate < end) || (!state.end && tranDate > start)) {
                return {
                    ...state,
                    items: [...state.items, action.payload]
                }
            } else {
                return state;
            }
        case UPDATE_TRANSACTION:
            const tranDate2 = new Date(parseInt(action.payload.date));
            let start2 = new Date(new Date(state.start).setDate(state.start.getDate() - 1));
            let end2 = new Date(state.end);
            if ((state.end && tranDate2 > start2 && tranDate2 < end2) || (!state.end && tranDate2 > start2)) {
                return {
                    ...state,
                    items: [...state.items.filter(item => item._id !== action.payload._id), action.payload]
                }
            } else {
                return {
                    ...state,
                    items: state.items.filter(item => item._id !== action.payload._id)
                }
            }
        case DELETE_TRANSACTION:
            return {
                ...state,
                items: state.items.filter(item => item._id !== action.payload)
            }
        case GET_DAY_TRANSACTIONS:
            return {
                ...state,
                dayTransactions: action.payload
            }
        case CLOSE_DAY_TRANSACTIONS:
            return {
                ...state,
                dayTransactions: {}
            }
        default:
            return state;
    }
}