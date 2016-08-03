import * as EventEmitter from 'eventemitter3';
import { assign } from 'lodash';

import Dispatcher from '../Dispatcher/Dispatcher';
import { Category } from '../models/Category';
import { Product } from '../models/Product';
import { ShoppingCartProduct } from '../models/ShoppingCartProduct';
import * as ShoppingCartActionTypes from '../constants/ShoppingCartActionTypes';
import * as ProductActionTypes from '../constants/ProductActionTypes';
import ProductIdGenerator from '../IdGenerator'

var _categories: Category[] = [{
        id: 1,
        name: "Fruit & Vegetables",
    },
    {
        id: 2,
        name: "Meat",
    }];

var _products: Product[] = [
        {id: ProductIdGenerator.getId(), categoryId: 1, name: "Strawberries", price:2, quantity: 5, image: "http://cdn-media-2.lifehack.org/wp-content/files/2015/05/02.jpg" },
        {id: ProductIdGenerator.getId(), categoryId: 1, name: "Oranges", price:1, quantity: 10, image: "https://upload.wikimedia.org/wikipedia/commons/c/c4/Orange-Fruit-Pieces.jpg" },
        {id: ProductIdGenerator.getId(), categoryId: 1, name: "Garlic", price:1, quantity: 3, image: "https://upload.wikimedia.org/wikipedia/commons/e/e5/GarlicBasket.jpg" },
        {id: ProductIdGenerator.getId(), categoryId: 2, name: "Chicken", price:3, quantity: 6, image: "http://mirrorspectrum.com/wp-content/uploads/2015/11/chicken-meat.jpg" },
        {id: ProductIdGenerator.getId(), categoryId: 2, name: "Beef", price:2, quantity: 7, image: "http://www.aratuonline.com.br/wp-content/uploads/2015/11/Ap%C3%B3s-tr%C3%AAs-anos-Brasil-volta-a-vender-carne-bovina-para-Ar%C3%A1bia-Saudita.jpg" },
    ];

var _categoryId: number;
var _shoppingCartItems: ShoppingCartProduct[];


function getCategory(categoryId: number) {
    return _categories.find((c: Category) => c.id === categoryId);
}

function getProduct(productId: number) {
    return _products.find(p => p.id === productId);
}

function getCartProduct(productId: number) {
    return _shoppingCartItems.find((i) => i.productId === productId);
}

function mapProducts(productId: number, properties: any): Product[]{
    return _products.map(p =>
            p.id === productId
                ? <Product>assign({}, p, properties)
                : p);
}

function editProductName(productId: number, productName: string){
    _products = mapProducts(productId, { name: productName });
}

function editProductPrice(productId: number, productPrice: number){
    _products = mapProducts(productId, { price: productPrice });
}

function editProductQuantity(productId: number, productQuantity: number){
    _products = mapProducts(productId, { quantity: productQuantity });
}

function deleteProduct(productId: number){
    _products = _products.filter(p => p.id !== productId);

}

function addProduct(product: Product){
    _products = _products.concat(<Product>assign({}, product));
}

function addItemToCart(productId: number, productName: string, quantity: number){
    var element = getCartProduct(productId);
        if(element){
            _shoppingCartItems = <ShoppingCartProduct[]>_shoppingCartItems.map(p =>
                p.productId === productId
                    ? assign(<ShoppingCartProduct>{}, p, { quantity: (p.quantity + quantity) })
                    : p
                );
        } else {
            _shoppingCartItems = _shoppingCartItems.concat(
                <ShoppingCartProduct>{
                    productId: productId,
                    quantity: quantity
                });
        }
}

function removeItemFromCart(productId: number){
    _shoppingCartItems = _shoppingCartItems.filter(p => p.productId != productId);
}

Dispatcher.register((action: any) => {
    switch(action.actionType) {
        case ProductActionTypes.CATEGORY_CHANGE:
            _categoryId = action.categoryId;
            store.emitChange();
            break;
        case ProductActionTypes.EDIT_PRODUCT_NAME:
            editProductName(action.payload.productId, action.payload.name);
            store.emitChange();
            break;
        case ProductActionTypes.EDIT_PRODUCT_PRICE:
            editProductPrice(action.payload.productId, action.payload.price);
            store.emitChange();
            break;
        case ProductActionTypes.EDIT_PRODUCT_QUANTITY:
            editProductQuantity(action.payload.productId, action.payload.quantity);
            store.emitChange();
            break;
        case ProductActionTypes.DELETE_PRODUCT:
            deleteProduct(action.productId);
            removeItemFromCart(action.productId);
            store.emitChange();
            break;
        case ProductActionTypes.ADD_PRODUCT:
            addProduct(action.product);
            store.emitChange();
            break;
        case ShoppingCartActionTypes.ADD_ITEM_TO_CART:
            var product = getProduct(action.productId);
            editProductQuantity(action.productId, product.quantity - action.quantity);
            addItemToCart(action.productId, action.productName, action.quantity);
            store.emitChange();
            break;
        case ShoppingCartActionTypes.REMOVE_ITEM_FROM_CART:
            var product = getProduct(action.productId);
            var cartProduct = getCartProduct(action.productId);
            editProductQuantity(action.productId, product.quantity + cartProduct.quantity);
            removeItemFromCart(action.productId);
            store.emitChange();
            break;
    }
})

class SupermarketStore extends EventEmitter {
    private CHANGE_EVENT = 'change';

    constructor(){
        super();
        _shoppingCartItems = new Array<ShoppingCartProduct>();
        _categoryId = undefined;
    }
    getCategories(): Category[] {
        return _categories;
    }
    getProducts(): Product[] {
        return _products;
    }
    getCategoryId(): number {
        return _categoryId;
    }
    getShoppingCartItems(): ShoppingCartProduct[] {
        return _shoppingCartItems;
    }
    emitChange(): void {
        this.emit(this.CHANGE_EVENT);
    }
    addChangeListener(callback: () => void): void {
        this.on(this.CHANGE_EVENT, callback);
    }
    removeChangeListener(callback: () => void) {
        this.removeListener(this.CHANGE_EVENT, callback);
    }

}

var store = new SupermarketStore();

export default store;