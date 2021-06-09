import {
    GET_DAY_TRANSACTIONS,
    CLOSE_DAY_TRANSACTIONS
} from '../types';

export const getDayTransactions = transactions => dispatch => {
    dispatch({
        type: GET_DAY_TRANSACTIONS,
        payload: transactions
    });
}

export const closeDayTransactions = () => dispatch => {
    dispatch({type: CLOSE_DAY_TRANSACTIONS});
}