import axios from 'axios';
import {returnMainAlert} from '../mainAlertActions';
import {loading, loaded} from '../loaderActions';
import {setTokenAndConfig} from '../requestConfig';
import {closeTransactionDetails} from './transactionDetails';
import {UPDATE_TRANSACTION} from '../types';

export const updateTransaction = item => (dispatch, getState) => {
    dispatch(loading());

    const body = JSON.stringify(item);

    axios
        .patch(`/api/transactions/${item._id}`, body, setTokenAndConfig(getState))
        .then(res => {
            dispatch(closeTransactionDetails());
            dispatch(returnMainAlert('success', res.data.msg));
            dispatch({
                type: UPDATE_TRANSACTION,
                payload: res.data.transaction
            });
            dispatch(loaded());
        })
        .catch(err => {
            dispatch(returnMainAlert('danger', err.response.data.msg));
            dispatch(loaded());
        });
}