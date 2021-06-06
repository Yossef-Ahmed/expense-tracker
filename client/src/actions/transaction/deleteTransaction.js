import axios from 'axios';
import {returnMainAlert} from '../mainAlertActions';
import {loading, loaded} from '../loaderActions';
import {setTokenAndConfig} from '../requestConfig';
import {closeConfirm} from '../confirmActions';
import {DELETE_TRANSACTION} from '../types';

export const deleteTransaction = tranId => (dispatch, getState) => {
    dispatch(loading());

    axios
        .delete(`/api/transactions/${tranId}`, setTokenAndConfig(getState))
        .then(res => {
            dispatch(closeConfirm(false));
            dispatch(returnMainAlert('success', res.data.msg));
            dispatch({
                type: DELETE_TRANSACTION,
                payload: tranId
            });
            dispatch(loaded());
        })
        .catch(err => {
            dispatch(returnMainAlert('danger', err.response.data.msg));
            dispatch(loaded());
        });
}