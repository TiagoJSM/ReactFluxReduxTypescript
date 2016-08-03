import * as React from "react";

import ShoppingHeader from './components/ShoppingHeader';
import ShoppingSection from './components/ShoppingSection';
import * as ProductActions from './Actions/products';
import { Category } from './models/Category';
import { Product } from './models/Product';
import { ShoppingCartProduct } from './models/ShoppingCartProduct';
import store from './Stores/SupermarketStore';

interface AppState {
    categories: Category[];
    products: Product[];
    categoryId: number;
    shoppingCartItems: ShoppingCartProduct[];
}

class App extends React.Component<void, AppState> {

    componentWillMount() {
        this._onChange();
    }

    private _onChange = () => {
        this.setState({
            categories: store.getCategories(),
            products: store.getProducts(),
            categoryId: store.getCategoryId(),
            shoppingCartItems: store.getShoppingCartItems()
        });
    };

    componentDidMount() {
        store.addChangeListener(this._onChange);
    };

    componentWillUnmount() {
        store.removeChangeListener(this._onChange);
    };

    render() {
        return (
            <div className="todoapp">
                <ShoppingHeader />
                <div className="container">
                    <ShoppingSection
                        categories={this.state.categories}
                        categoryId={this.state.categoryId}
                        products={this.state.products}
                        shoppingCartProducts={this.state.shoppingCartItems}
                        actions={ProductActions}/>
                </div>
            </div>
        );
    }
}

export default App;
