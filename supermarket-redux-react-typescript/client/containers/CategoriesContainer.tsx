import * as React from 'react';
import { connect } from 'react-redux';

import { Category, CategoryView } from '../models/Category';
import { Product } from '../models/Product';

import Categories from '../components/Categories';
import * as ProductActions from '../actions/products';
import { bindActionCreators } from 'redux';

function GetCategoryViews(state: any): CategoryView[] {
    let products = state.products as Product[];
    let categories = state.categories as Category[];
    return categories.map(c => {
        let productCount = products.filter(p => p.categoryId == c.id).length;
        return {
            id: c.id,
            name: c.name,
            productsCount: productCount,
       };
    });
}

const mapStateToProps = state => ({
    categories: GetCategoryViews(state),
});

const mapDispatchToProps = dispatcher => ({
    actions: bindActionCreators(ProductActions, dispatcher)
});

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
