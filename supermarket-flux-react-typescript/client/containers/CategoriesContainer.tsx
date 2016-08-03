import * as React from 'react';

import { Category, CategoryView } from '../models/Category';
import { Product } from '../models/Product';
import Categories from '../Components/Categories'
import Store from '../Stores/SupermarketStore';
import * as ProductActions from '../Actions/products';

interface CategoriesContainerState {
  categories: Category[];
  products: Product[];
};

class CategoriesContainer extends React.Component<void, CategoriesContainerState> {
    private _onChange = () => {
        this.setState({
            categories: Store.getCategories(),
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
            <Categories
                categories = {this.GetCategoryViews()}
                onCategoryChange = {ProductActions.categoryChange}/>
        );
    }

    private GetCategoryViews(): CategoryView[] {
        let products = this.state.products as Product[];
        let categories = this.state.categories;
        return categories.map(c => {
            let productCount = products.filter(p => p.categoryId == c.id).length;
            return {
                id: c.id,
                name: c.name,
                productCount: productCount,
            }
        });
    }
}

export default CategoriesContainer;
