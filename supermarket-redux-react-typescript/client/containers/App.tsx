import { bindActionCreators, IDispatch } from 'redux';
import { connect } from 'react-redux';
import * as React from 'react';

import ShoppingHeader from '../components/ShoppingHeader';
import ShoppingSection from '../components/ShoppingSection';
import * as ProductActions from '../actions/products';
import { Category } from '../models/Category';
import { Product } from '../models/Product';
import { ShoppingCartProduct } from '../models/ShoppingCartProduct';

interface AppProps {
    categoryId?: number;
    dispatch?: IDispatch;
}

class App extends React.Component<AppProps, void> {
    constructor() {
        super();

    }
    render() {
        const { categoryId, dispatch } = this.props;
        const actions = bindActionCreators(ProductActions as any, dispatch);

        return (
            <div className="todoapp">
                <ShoppingHeader />
                <div className="container">
                    <ShoppingSection 
                        categoryId={categoryId} 
                        actions={actions}/>
                </div>
            </div>
        );
    }
}

const mapShoppingSectionStateToProps = state => ({
    categoryId: state.categoryId,
});

export default connect(mapShoppingSectionStateToProps)(App);
