import axios from 'axios';
import {returnMainAlert} from '../mainAlertActions';
import {loading, loaded} from '../loaderActions';
import {setTokenAndConfig} from '../requestConfig';
import {CREATE_TRANSACTION} from '../types';

export const createTransaction = item => (dispatch, getState) => {
    dispatch(loading());

    const body = JSON.stringify(item);

    axios
        .post(`/api/transactions/create`, body, setTokenAndConfig(getState))
        .then(res => {
            dispatch(returnMainAlert('success', res.data.msg));
            dispatch({
                type: CREATE_TRANSACTION,
                payload: res.data.transaction
            });
            dispatch(loaded());
        })
        .catch(err => {
            dispatch(returnMainAlert('danger', err.response.data.msg));
            dispatch(loaded());
        });
}