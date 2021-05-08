import axios from 'axios';
import {returnMainAlert} from './mainAlertActions';
import {loading, loaded} from './loaderActions';
import {setConfirm} from './confirmActions';
import {setTokenAndConfig} from './requestConfig';
import {
    GET_CATEGORIES,
    GET_CATEGORY,
    CREATE_CATEGORY,
    UPDATE_CATEGORY,
    DELETE_CATEGORY,
    CLOSE_CATEGORY_DETAILS,
    UNLOAD_CATEGORIES
} from '../actions/types';

// Get Categories
export const getCategories = cats => dispatch => {
    dispatch({
        type: GET_CATEGORIES,
        payload: cats
    });
}

// Get Category Details
export const getCategory = cat => dispatch => {
    dispatch({
        type: GET_CATEGORY,
        payload: cat
    });
}

// Close Category Details Card
export const closeDetailsCard = () => dispatch => {
    dispatch({type: CLOSE_CATEGORY_DETAILS});
}

// Create Category
export const createCategory = item => (dispatch, getState) => {
    dispatch(loading());
    // Set the Body
    const body = JSON.stringify(item);
    // Send the request
    axios.post(`/api/user/categories/`, body, setTokenAndConfig(getState))
        .then(res => {
            dispatch(returnMainAlert(res.data.msg, 'Success!', 'success'));
            dispatch({
                type: CREATE_CATEGORY,
                payload: res.data.category
            });
            dispatch(loaded());
        })
        .catch(err => {
            dispatch(returnMainAlert(err.response.data.msg, 'Error!', 'danger'));
            dispatch(loaded());
        });
}

// Update Category
export const updateCategory = item => (dispatch, getState) => {
    dispatch(loading());
    // Set the Body
    const body = JSON.stringify(item);
    // Send the request
    axios.patch(`/api/user/categories/${item._id}`, body, setTokenAndConfig(getState))
        .then(res => {
            dispatch(returnMainAlert(res.data.msg, 'Success!', 'success'));
            dispatch({
                type: UPDATE_CATEGORY,
                payload: res.data.category
            });
            dispatch(loaded());
        })
        .catch(err => {
            dispatch(returnMainAlert(err.response.data.msg, 'Error!', 'danger'));
            dispatch(loaded());
        });
}

// Delete Category
export const deleteCategory = catId => (dispatch, getState) => {
    dispatch(loading());
    // Send the request
    axios.delete(`/api/user/categories/${catId}`, setTokenAndConfig(getState))
        .then(res => {
            dispatch(setConfirm());
            dispatch(returnMainAlert(res.data.msg, 'Success!', 'success'));
            dispatch({
                type: DELETE_CATEGORY,
                payload: catId
            });
            dispatch(loaded());
        })
        .catch(err => {
            dispatch(returnMainAlert(err.response.data.msg, 'Error!', 'danger'));
            dispatch(loaded());
        });
}

// Unload the categories
export const unloadCategories = () => dispatch => {
    dispatch({type: UNLOAD_CATEGORIES});
}