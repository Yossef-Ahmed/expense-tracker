import {
    GET_TRANSACTION,
    CLOSE_TRANSACTION_DETAILS
} from '../types';

export const getTransactionDetails = transaction => dispatch => {
    dispatch({
        type: GET_TRANSACTION,
        payload: transaction
    });
}

export const closeTransactionDetails = () => dispatch => {
    dispatch({type: CLOSE_TRANSACTION_DETAILS});
}