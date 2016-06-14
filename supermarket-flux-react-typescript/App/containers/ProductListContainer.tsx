import * as React from 'react';

import { Category, CategoryView } from '../models/Category';
import { Product } from '../models/Product';
import ProductList from '../Components/ProductList'
import Store from '../Stores/SupermarketStore';
import * as ProductActions from '../Actions/products';

interface ProductListContainerState {
  categoryId: number;
  products: Product[];
};

class ProductListContainer extends React.Component<void, ProductListContainerState> {
    private _onChange = () => {
        this.setState({
            categoryId: Store.getCategoryId(),
            products: Store.getProducts(),
        });
    };

    componentWillMount() {
        Store.addChangeListener(this._onChange);
        this._onChange();
    }
    componentWillUnmount() {
        Store.removeChangeListener(this._onChange);
    };

    render() {
        return (
            <ProductList
                products = {this.getVisibleProducts()}
                actions = {ProductActions}/>
        );
    }

    private getVisibleProducts(): Product[] {
        let { categoryId, products } = this.state;
        if(products == null || categoryId === null){
            return products = [];
        }
        else {
            return products.filter(p => p.categoryId === categoryId);
        }
    }
}

export default ProductListContainer;
