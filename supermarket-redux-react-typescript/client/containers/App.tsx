import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as React from 'react';

import ShoppingHeader from '../components/ShoppingHeader';
import ShoppingSection from '../components/ShoppingSection';
import * as ProductActions from '../actions/products';
import { Category } from '../models/Category';
import { Product } from '../models/Product';
import { ShoppingCartProduct } from '../models/ShoppingCartProduct';

interface AppProps {
    categories: Category[];
    viewProducts: Product[];
    categoryId: number;
    shoppingCartItems: ShoppingCartProduct[];
    dispatch: Dispatch;
}

class App extends React.Component<AppProps, void> {
    constructor() {
        super();

    }
    render() {
        const { categories, viewProducts, categoryId, shoppingCartItems, dispatch } = this.props;
        const actions = bindActionCreators(ProductActions, dispatch);

        return (
            <div className="todoapp">
                <ShoppingHeader />
                <div className="container">
                    <ShoppingSection 
                        categories={categories} 
                        categoryId={categoryId} 
                        products={viewProducts}
                        shoppingCartProducts={shoppingCartItems}
                        actions={actions}/>
                </div>
            </div>
        );
    }
}

const mapShoppingSectionStateToProps = state => ({
    categories: state.categories,
    products: state.products,
    categoryId: state.categoryId,
    shoppingCartItems: state.shoppingCartItems,
});

export default connect(mapShoppingSectionStateToProps)(App);
