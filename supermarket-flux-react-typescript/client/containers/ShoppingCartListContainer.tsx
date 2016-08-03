import * as React from 'react';

import { ShoppingCartProduct, ShoppingCartProductView } from '../models/ShoppingCartProduct';
import { Product } from '../models/Product';
import ShoppingCartList from '../Components/ShoppingCartList'
import Store from '../Stores/SupermarketStore';
import * as ProductActions from '../Actions/products';

interface ShoppingCartListContainerState {
  shoppingCartProducts: ShoppingCartProduct[];
  products: Product[];
};

class ShoppingCartListContainer extends React.Component<void, ShoppingCartListContainerState> {
    private _onChange = () => {
        this.setState({
            shoppingCartProducts: Store.getShoppingCartItems(),
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
            <ShoppingCartList
                products = {this.getShoppingCartProducts()}
                removeFromCart = {ProductActions.removeProductFromCart}/>
        );
    }

    private getShoppingCartProducts(): ShoppingCartProductView[] {
        let { shoppingCartProducts, products } = this.state;
        return shoppingCartProducts.map(i => {
        let product = products.find(p => p.id == i.productId);
        return {
            productId: i.productId,
            name: product.name,
            quantity: i.quantity
        };
    });
    }
}

export default ShoppingCartListContainer;
