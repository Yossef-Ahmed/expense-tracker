import {GET_CATEGORIES} from '../types';

export const getCategories = cats => dispatch => {
    dispatch({
        type: GET_CATEGORIES,
        payload: cats
    });
}