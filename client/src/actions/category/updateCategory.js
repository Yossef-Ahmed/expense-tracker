import axios from 'axios';
import {returnMainAlert} from '../mainAlertActions';
import {loading, loaded} from '../loaderActions';
import {setTokenAndConfig} from '../requestConfig';
import {UPDATE_CATEGORY} from '../types';

export const updateCategory = item => (dispatch, getState) => {
    dispatch(loading());
    
    const body = JSON.stringify(item);
    
    axios
        .patch(`/api/user/categories/${item._id}`, body, setTokenAndConfig(getState))
        .then(res => {
            dispatch(returnMainAlert('success', res.data.msg));
            dispatch({
                type: UPDATE_CATEGORY,
                payload: res.data.category
            });
            dispatch(loaded());
        })
        .catch(err => {
            dispatch(returnMainAlert('danger', err.response.data.msg));
            dispatch(loaded());
        });
}