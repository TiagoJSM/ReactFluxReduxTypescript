import { assign } from 'lodash';
import { handleActions, Action } from 'redux-actions';

import { Product } from '../models/Product';
import { Category } from '../models/Category';
import {
CATEGORY_CHANGE,
EDIT_PRODUCT_NAME,
EDIT_PRODUCT_PRICE,
EDIT_PRODUCT_QUANTITY,
DELETE_PRODUCT,
ADD_PRODUCT
} from '../constants/ProductActionTypes';

import {
ADD_ITEM_TO_CART,
REMOVE_ITEM_FROM_CART
} from '../constants/ShoppingCartActionTypes';

const initialState = [];

function MapProductProperties(state: Product[], productId: number, properties: any) {
    return <Product[]>state.map(product =>
            product.id === productId
                ? assign(<Product>{}, product, properties)
                : product
        );
}

export default handleActions<Product[], any>({
    [EDIT_PRODUCT_NAME]: (state: Product[], action: Action<any>): Product[] => {
        return MapProductProperties(state, action.payload.id, { name: action.payload.name });
    },
    [EDIT_PRODUCT_PRICE]: (state: Product[], action: Action<any>): Product[] => {
        return MapProductProperties(state, action.payload.id, { price: action.payload.price });
    },
    [EDIT_PRODUCT_QUANTITY]: (state: Product[], action: Action<any>): Product[] => {
        return MapProductProperties(state, action.payload.id, { quantity: action.payload.quantity });
    },
    [DELETE_PRODUCT]: (state: Product[], action: Action<any>): Product[] => {
        return state.filter(p => p.id != action.payload.productId);
    },
    [ADD_PRODUCT]: (state: Product[], action: Action<any>): Product[] => {
        return state.concat(<Product>assign(<Product>{}, <Product>action.payload.product));
    },
    [ADD_ITEM_TO_CART]: (state: Product[], action: Action<any>): Product[] => {
        const {productId, productName, quantity} = action.payload;
        return <Product[]>state.map(p => 
            p.id === productId
                ? assign(<Product>{}, p, { quantity: p.quantity - quantity })
                : p);
    },
    [REMOVE_ITEM_FROM_CART]: (state: Product[], action: Action<any>): Product[] => {
        let productId = action.payload.productId;
        let quantity = action.payload.quantity;
        return <Product[]>state.map(p => 
            p.id === productId
                ? assign(<Product>{}, p, { quantity: p.quantity + quantity})
                : p);
    },
}, initialState);
