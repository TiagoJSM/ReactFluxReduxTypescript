import { createAction, Action } from 'redux-actions';
import { assign } from 'lodash';

import { Product } from '../models/Product';
import { Category } from '../models/Category';
import { ShoppingCartProduct, ShoppingCartProductView } from '../models/ShoppingCartProduct'
import * as productActionTypes from '../constants/ProductActionTypes';
import * as shoppingCartActionTypes from '../constants/ShoppingCartActionTypes'
import ProductIdGenerator from '../IdGenerator'

const categoryChange = createAction<number>(
  productActionTypes.CATEGORY_CHANGE,
  (categoryId: number) => categoryId
);

const productNameChange = createAction(
  productActionTypes.EDIT_PRODUCT_NAME,
  (product: Product, name: string) => {
      return {id: product.id, name};
  }
);

const productPriceChange = createAction(
  productActionTypes.EDIT_PRODUCT_PRICE,
  (product: Product, price: number) => {
      return {id: product.id, price}
  }
);

const productQuantityChange = createAction(
  productActionTypes.EDIT_PRODUCT_QUANTITY,
  (product: Product, quantity: number) => {
      return {id: product.id, quantity}
    }
);

const deleteProduct = createAction(
  productActionTypes.DELETE_PRODUCT,
  (product: Product) => {
      return {
          productId: product.id
      };
  }
);

const addProduct = createAction(
  productActionTypes.ADD_PRODUCT,
  (product: Product) => {
      product.id = ProductIdGenerator.getId();
      return {
          product: product
      };
  }
);

const addProductToCart = createAction(
  shoppingCartActionTypes.ADD_ITEM_TO_CART,
  (productId: number, quantity: number) => {
        return {
            productId,
            quantity: quantity
        };
    }
);

const removeProductFromCart = createAction(
    shoppingCartActionTypes.REMOVE_ITEM_FROM_CART,
    (product: ShoppingCartProductView) => {
        return product;
    }
);

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
