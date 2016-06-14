import * as React from 'react';

import { ShoppingCartProductView } from '../models/ShoppingCartProduct';
import ShoppingCartListItem from './ShoppingCartListItem';

interface ShoppingCartListProps {
    products: ShoppingCartProductView[];
    removeFromCart: Function;
};

interface ShoppingCartListState {
};

class ShoppingCartList extends React.Component<ShoppingCartListProps, ShoppingCartListState> {
    constructor(props, context) {
        super(props, context);
        this.state = {
        };
    }

    render() {
        return (
            <div>
                {this.props.products.map(p => 
                    <ShoppingCartListItem 
                        product={p} 
                        removeFromCart={this.props.removeFromCart}/>
                )}
            </div>
        );
    }
}

export default ShoppingCartList;
