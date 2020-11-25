import axios from 'axios';
import {returnAlert} from './alertActions';
import {loading, loaded} from './loaderActions';
import {setConfirm} from './confirmActions';
import {tokenConfig} from './authActions';
import {
    GET_TRANSACTIONS,
    GET_TRANSACTION,
    CREATE_TRANSACTION,
    DELETE_TRANSACTION,
    UPDATE_TRANSACTION,
    CHANGE_CURR_MONTH,
    CLOSE_TRANSACTION_DETAILS,
    UNLOAD_TRANSACTIONS
} from './types';

// Get transactions by month
export const getTransactions = date => (dispatch, getState) => {
    dispatch(loading());
    // Get the date and change the format
    let end = new Date(date).setHours(23, 59, 59, 999).toString();
    let start = new Date(new Date(date).setDate(1)).setHours(0, 0, 0, 0).toString();
    // Check if the date is greater then today
    if (new Date(date) > new Date()) {
        start = new Date(date).setHours(0, 0, 0, 0).toString();
        end = null;
    }
    // Change the state
    dispatch({
        type: CHANGE_CURR_MONTH,
        payload: {start: new Date(parseInt(start)), end: new Date(parseInt(end))}
    });
    // Set the Body
    const body = JSON.stringify({start, end});
    // Send the request
    axios.post('/api/transactions', body, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_TRANSACTIONS,
                payload: res.data
            });
            dispatch(loaded());
        })
        .catch(err => {
            dispatch(returnAlert(err.response.data.msg, 'Error!', 'danger'));
            dispatch(loaded());
        });
}

// Get Transaction Details
export const getTransaction = transaction => dispatch => {
    dispatch({
        type: GET_TRANSACTION,
        payload: transaction
    });
}

// Close Transaction Details Card
export const closeDetailsCard = () => dispatch => {
    dispatch({type: CLOSE_TRANSACTION_DETAILS});
}

// Create Transaction
export const createTransaction = item => (dispatch, getState) => {
    dispatch(loading());
    // Set the Body
    const body = JSON.stringify(item);
    // Send the request
    axios.post(`/api/transactions/create`, body, tokenConfig(getState))
        .then(res => {
            dispatch(returnAlert(res.data.msg, 'Success!', 'success'));
            dispatch({
                type: CREATE_TRANSACTION,
                payload: res.data.transaction
            });
            dispatch(loaded());
        })
        .catch(err => {
            dispatch(returnAlert(err.response.data.msg, 'Error!', 'danger'));
            dispatch(loaded());
        });
}

// Update Transaction
export const updateTransaction = item => (dispatch, getState) => {
    dispatch(loading());
    // Set the Body
    const body = JSON.stringify(item);
    // Send the request
    axios.patch(`/api/transactions/${item._id}`, body, tokenConfig(getState))
        .then(res => {
            dispatch(returnAlert(res.data.msg, 'Success!', 'success'));
            dispatch({
                type: UPDATE_TRANSACTION,
                payload: res.data.transaction
            });
            dispatch(loaded());
        })
        .catch(err => {
            dispatch(returnAlert(err.response.data.msg, 'Error!', 'danger'));
            dispatch(loaded());
        });
}

// Delete Transaction
export const deleteTransaction = tranId => (dispatch, getState) => {
    dispatch(loading());
    // Send the request
    axios.delete(`/api/transactions/${tranId}`, tokenConfig(getState))
        .then(res => {
            dispatch(setConfirm());
            dispatch(returnAlert(res.data.msg, 'Success!', 'success'));
            dispatch({
                type: DELETE_TRANSACTION,
                payload: tranId
            });
            dispatch(loaded());
        })
        .catch(err => {
            dispatch(returnAlert(err.response.data.msg, 'Error!', 'danger'));
            dispatch(loaded());
        });
}

// Unload the transactions
export const unloadTransactions = () => dispatch => {
    dispatch({type: UNLOAD_TRANSACTIONS});
}