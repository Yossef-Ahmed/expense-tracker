import {loading, loaded} from '../loaderActions';
import {LOGOUT_SUCCESS} from '../types';

export const logout = () => dispatch => {
    dispatch(loading());
    setTimeout(() => {
        dispatch({type: LOGOUT_SUCCESS});
        dispatch(loaded());
    }, 500);
}