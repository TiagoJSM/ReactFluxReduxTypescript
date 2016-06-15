import { assign } from 'lodash';
import { handleActions, Action } from 'redux-actions';

import { Product } from '../models/Product';
import { Category } from '../models/Category';
import {
DELETE_PRODUCT,
ADD_PRODUCT
} from '../constants/ProductActionTypes';

export default handleActions<Category[], any>({ });
