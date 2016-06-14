import { combineReducers } from 'redux';

import products from './products';
import categories from './category';
import categoryId from './categoryId';
import shoppingCart from './shoppingCart';

function shopping(state, action) {
  return {
    categories: categories(state.categories, action),
    products: products(state.products, action),
    categoryId: categoryId(state.categoryId, action),
    shoppingCartItems: shoppingCart(state.shoppingCartItems, action),
  };
}

export { shopping };
