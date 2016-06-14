import { assign } from 'lodash';

import Dispatcher from '../Dispatcher/Dispatcher';
import { Product } from '../models/Product';
import { Category } from '../models/Category';
import { ShoppingCartProduct } from '../models/ShoppingCartProduct';
import * as productActionTypes from '../constants/ProductActionTypes';
import * as shoppingCartActionTypes from '../constants/ShoppingCartActionTypes';
import ProductIdGenerator from '../IdGenerator';

function categoryChange(categoryId: number): void {
    Dispatcher.dispatch({
        actionType: productActionTypes.CATEGORY_CHANGE,
        categoryId: categoryId
    });
}

function productNameChange(product: Product, name: string): void {
    Dispatcher.dispatch({
        actionType: productActionTypes.EDIT_PRODUCT_NAME,
        payload: {
            productId: product.id,
            name: name
        }
    });
}

function productPriceChange(product: Product, price: number): void {
    Dispatcher.dispatch({
        actionType: productActionTypes.EDIT_PRODUCT_PRICE,
        payload: {
            productId: product.id,
            price: price
        }
    });
}

function productQuantityChange(product: Product, quantity: number): void {
    Dispatcher.dispatch({
        actionType: productActionTypes.EDIT_PRODUCT_QUANTITY,
        payload: {
            productId: product.id,
            quantity: quantity
        }
    });
}

function deleteProduct(product: Product): void {
    Dispatcher.dispatch({
        actionType: productActionTypes.DELETE_PRODUCT,
        productId: product.id
    });
}

function addProduct(product: Product): void {
    Dispatcher.dispatch({
        actionType: productActionTypes.ADD_PRODUCT,
        product: product
    });
}

function addProductToCart(productId: number, quantity: number): void {
    Dispatcher.dispatch({
        actionType: shoppingCartActionTypes.ADD_ITEM_TO_CART,
        productId: productId,
        quantity: quantity
    });
}

function removeProductFromCart(cartProduct: ShoppingCartProduct): void {
    Dispatcher.dispatch({
        actionType: shoppingCartActionTypes.REMOVE_ITEM_FROM_CART,
        productId: cartProduct.productId
    });
}

export {
    categoryChange,
    productNameChange,
    productPriceChange,
    productQuantityChange,
    deleteProduct,
    addProduct,
    addProductToCart,
    removeProductFromCart
}
