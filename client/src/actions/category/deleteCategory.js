import axios from 'axios';
import {returnMainAlert} from '../mainAlertActions';
import {loading, loaded} from '../loaderActions';
import {setTokenAndConfig} from '../requestConfig';
import {setConfirm} from '../confirmActions';
import {DELETE_CATEGORY} from '../types';

export const deleteCategory = catId => (dispatch, getState) => {
    dispatch(loading());
    
    axios
        .delete(`/api/user/categories/${catId}`, setTokenAndConfig(getState))
        .then(res => {
            dispatch(setConfirm());
            dispatch(returnMainAlert('success', res.data.msg));
            dispatch({
                type: DELETE_CATEGORY,
                payload: catId
            });
            dispatch(loaded());
        })
        .catch(err => {
            dispatch(returnMainAlert('danger', err.response.data.msg));
            dispatch(loaded());
        });
}