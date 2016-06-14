import * as React from 'react';

import { ShoppingCartProductView } from '../models/ShoppingCartProduct';

interface ShoppingCartListItemProps {
    product: ShoppingCartProductView;
    removeFromCart: Function;
};

interface ShoppingCartListItemState {
};

class ShoppingCartListItem extends React.Component<ShoppingCartListItemProps, ShoppingCartListItemState> {
    constructor(props, context) {
        super(props, context);
        this.state = {
        };
    }

    render() {
        return (
            <div>
                <button type="button" className="btn btn-danger btn-xs" onClick={() => this.props.removeFromCart(this.props.product)}>
                            <span className="glyphicon glyphicon-remove"></span> 
                        </button>
                {this.props.product.name} {this.props.product.quantity}   
            </div>
        );
    }
}

export default ShoppingCartListItem;
