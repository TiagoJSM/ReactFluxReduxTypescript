import * as React from 'react';
import { connect } from 'react-redux';

import { Product } from '../models/Product';

import ProductList from '../components/ProductList';
import * as ProductActions from '../actions/products';
import { bindActionCreators } from 'redux';

function getVisibleProducts(state: any): Product[] {
    let { products, categoryId } = state;
    if(products == null || categoryId === null){
        return products = [];
    }
    else {
        return products.filter(p => p.categoryId === categoryId);
    }
}

const mapStateToProps = state => ({
    products: getVisibleProducts(state),
});

const mapDispatchToProps = dispatcher => ({
    actions: bindActionCreators(ProductActions, dispatcher)
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
