import * as React from 'react';
import { connect } from 'react-redux';

import { ShoppingCartProduct, ShoppingCartProductView } from '../models/ShoppingCartProduct';
import { Product } from '../models/Product';

import ShoppingCartList from '../components/ShoppingCartList';
import * as ProductActions from '../actions/products';
import { bindActionCreators } from 'redux';

function GetShoppingCartItemViews(state: any): ShoppingCartProductView[] {
    let shoppingCartItems = state.shoppingCartItems as ShoppingCartProduct[];
    let products = state.products as Product[];
    
    return shoppingCartItems.map(i => {
        let product = products.find(p => p.id == i.productId);
        return {
            productId: i.productId,
            name: product.name,
            quantity: i.quantity
        };
    });
}

const mapStateToProps = state => ({
    products: GetShoppingCartItemViews(state),
});

const mapDispatchToProps = dispatcher => ({
    removeFromCart: bindActionCreators(ProductActions.removeProductFromCart, dispatcher)
});

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartList);
