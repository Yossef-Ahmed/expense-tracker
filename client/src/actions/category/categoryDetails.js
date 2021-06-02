import {
    GET_CATEGORY,
    CLOSE_CATEGORY_DETAILS
} from '../types';

export const getCategoryDetails = cat => dispatch => {
    dispatch({
        type: GET_CATEGORY,
        payload: cat
    });
}

export const closeCategoryDetails = () => dispatch => {
    dispatch({type: CLOSE_CATEGORY_DETAILS});
}