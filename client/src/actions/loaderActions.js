import {LOADING, LOADED} from './types';

export const loading = () => {
    return {
        type: LOADING
    }
}

export const loaded = () => {
    return {
        type: LOADED
    }
}