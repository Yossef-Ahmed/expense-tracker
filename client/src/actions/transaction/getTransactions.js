import axios from 'axios';
import {returnMainAlert} from '../mainAlertActions';
import {loading, loaded} from '../loaderActions';
import {setTokenAndConfig} from '../requestConfig';
import {
    GET_TRANSACTIONS,
    CHANGE_CURR_MONTH
} from '../types';

export const getTransactions = date => (dispatch, getState) => {
    dispatch(loading());
    
    let end = new Date(date).setHours(23, 59, 59, 999).toString();
    let start = new Date(new Date(date).setDate(1)).setHours(0, 0, 0, 0).toString();
    
    if (new Date(date) > new Date()) {
        start = new Date(date).setHours(0, 0, 0, 0).toString();
        end = null;
    }
    
    dispatch({
        type: CHANGE_CURR_MONTH,
        payload: {start: new Date(parseInt(start)), end: new Date(parseInt(end))}
    });
    
    const body = JSON.stringify({start, end});
    
    axios
        .post('/api/transactions', body, setTokenAndConfig(getState))
        .then(res => {
            dispatch({
                type: GET_TRANSACTIONS,
                payload: res.data
            });
            dispatch(loaded());
        })
        .catch(err => {
            dispatch(returnMainAlert('danger', err.response.data.msg));
            dispatch(loaded());
        });
}