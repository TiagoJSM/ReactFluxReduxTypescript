/// <reference path='../typings/tsd.d.ts'/>

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {
  Store,
  compose,
  createStore,
  bindActionCreators,
  combineReducers
} from 'redux';
import {
  connect,
  Provider
} from 'react-redux';
import { Action } from 'redux-actions';

import App from './containers/App';

import { shopping } from './reducers/shopping';
import { Product } from './models/product';
import ProductIdGenerator from './IdGenerator'

let categories =
  [
    { 
      id: 1, 
      name: "Fruit & Vegetables",  
    },
    { 
      id: 2, 
      name: "Meat",
    }
  ];
  
let products = 
  [
    {id: ProductIdGenerator.getId(), categoryId: 1, name: "Strawberries", price:2, quantity: 5, image: "http://cdn-media-2.lifehack.org/wp-content/files/2015/05/02.jpg" },
    {id: ProductIdGenerator.getId(), categoryId: 1, name: "Oranges", price:1, quantity: 10, image: "https://upload.wikimedia.org/wikipedia/commons/c/c4/Orange-Fruit-Pieces.jpg" },
    {id: ProductIdGenerator.getId(), categoryId: 1, name: "Garlic", price:1, quantity: 3, image: "https://upload.wikimedia.org/wikipedia/commons/e/e5/GarlicBasket.jpg" },
    {id: ProductIdGenerator.getId(), categoryId: 2, name: "Chicken", price:3, quantity: 6, image: "http://mirrorspectrum.com/wp-content/uploads/2015/11/chicken-meat.jpg" },
    {id: ProductIdGenerator.getId(), categoryId: 2, name: "Beef", price:2, quantity: 7, image: "http://www.aratuonline.com.br/wp-content/uploads/2015/11/Ap%C3%B3s-tr%C3%AAs-anos-Brasil-volta-a-vender-carne-bovina-para-Ar%C3%A1bia-Saudita.jpg" },
  ];

var initialState =
    {
        categories: categories,
        products: products,
        categoryId: null,
        shoppingCartItems: [],
    };

const store: Store = createStore(shopping, initialState);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
