import {UNLOAD_TRANSACTIONS} from '../types';

export const unloadTransactions = () => dispatch => {
    dispatch({type: UNLOAD_TRANSACTIONS});
}