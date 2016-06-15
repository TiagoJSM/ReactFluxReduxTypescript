import { assign } from 'lodash';
import { handleActions, Action } from 'redux-actions';

import { Product } from '../models/Product';
import { Category } from '../models/Category';
import { ShoppingCartProduct } from '../models/ShoppingCartProduct';
import {
ADD_ITEM_TO_CART,
REMOVE_ITEM_FROM_CART
} from '../constants/ShoppingCartActionTypes';

import {
CATEGORY_CHANGE,
EDIT_PRODUCT_PRICE,
EDIT_PRODUCT_QUANTITY,
DELETE_PRODUCT,
ADD_PRODUCT
} from '../constants/ProductActionTypes';

const initialState = [];

export default handleActions<ShoppingCartProduct[], any>({
    [ADD_ITEM_TO_CART]: (state: ShoppingCartProduct[], action: Action<any>): ShoppingCartProduct[] => {
        let element = state.find(p => p.productId == action.payload.productId);
        if(element != null){
            return <ShoppingCartProduct[]>state.map(p =>
                p.productId === action.payload.productId
                    ? assign(<ShoppingCartProduct>{}, p, { quantity: (p.quantity + action.payload.quantity) })
                    : p
                );
        }
        return state.concat(
            <ShoppingCartProduct>{
                productId: action.payload.productId,
                quantity: action.payload.quantity
            });
    },
    [REMOVE_ITEM_FROM_CART]: (state: ShoppingCartProduct[], action: Action<any>): ShoppingCartProduct[] => {
        return state.filter(p => p.productId != action.payload.productId);
    },
    [DELETE_PRODUCT]: (state: ShoppingCartProduct[], action: Action<any>): ShoppingCartProduct[] => {
        return state.filter(p => p.productId != action.payload.productId);
    },
}, initialState);
