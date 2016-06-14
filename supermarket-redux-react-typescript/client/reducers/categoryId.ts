import { assign } from 'lodash';
import { handleActions, Action } from 'redux-actions';

import { Product } from '../models/Product';
import { Category } from '../models/Category';
import {
CATEGORY_CHANGE
} from '../constants/ProductActionTypes';

const initialState = null;

export default handleActions<number>({
    [CATEGORY_CHANGE]: (state: number, action: Action): number => {
        if(!action.payload){
            return null;
        }
        return action.payload;
    },
}, initialState);
