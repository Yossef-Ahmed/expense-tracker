import axios from 'axios';
import {returnMainAlert} from '../mainAlertActions';
import {loading, loaded} from '../loaderActions';
import {setTokenAndConfig} from '../requestConfig';
import {CREATE_CATEGORY} from '../types';

export const createCategory = item => (dispatch, getState) => {
    dispatch(loading());
    
    const body = JSON.stringify(item);
    
    axios
        .post(`/api/user/categories/`, body, setTokenAndConfig(getState))
        .then(res => {
            dispatch(returnMainAlert('success', res.data.msg));
            dispatch({
                type: CREATE_CATEGORY,
                payload: res.data.category
            });
            dispatch(loaded());
        })
        .catch(err => {
            dispatch(returnMainAlert('danger', err.response.data.msg));
            dispatch(loaded());
        });
}