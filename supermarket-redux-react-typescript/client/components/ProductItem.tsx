import * as React from 'react';

import { Product } from '../models/Product';
import ProductItemTextInput from './ProductItemTextInput';

enum ProductEditing {
    None,
    Name,
    Price
}

interface ProductItemProps {
    product: Product;
    editProductName: Function;
    editProductPrice: Function;
    editProductQuantity: Function;
    deleteProduct: Function;
    addProductToCart: Function;
};

interface ProductItemState {
    productEditing?: ProductEditing;
    itemQuantityToBuy?: number;
};

class ProductItem extends React.Component<ProductItemProps, ProductItemState> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            productEditing: ProductEditing.None,
            itemQuantityToBuy: 1
        };
    }

    handleProductNameSave(text: string) {
        this.props.editProductName(this.props.product, text);
        this.setState({ productEditing: ProductEditing.None })
    }
    handleProductPriceSave(text: string) {
        this.props.editProductPrice(this.props.product, text);
        this.setState({ productEditing: ProductEditing.None })
    }
    handleProductDelete(){
        this.props.deleteProduct(this.props.product);
    }
    handleProductAddToCart(){
        if(this.props.product.quantity < this.state.itemQuantityToBuy){
            return;
        }
        this.props.addProductToCart(this.props.product.id, this.state.itemQuantityToBuy);
    }
    onQuantityToBuyChange(e){
        this.setState({ itemQuantityToBuy: parseInt(e.target.value) })
    }

    renderProductName() {
        if (this.state.productEditing == ProductEditing.Name) {
            return (
                <ProductItemTextInput
                    text={this.props.product.name}
                    placeholder="Product name"
                    onSave={this.handleProductNameSave.bind(this) } />);
        }
        return (
            <label onDoubleClick={() => this.setState({ productEditing: ProductEditing.Name }) }>
                {this.props.product.name}
            </label>);
    }
    renderProductPrice() {
        if (this.state.productEditing == ProductEditing.Price) {
            return (
                <ProductItemTextInput
                    text={this.props.product.price.toString() }
                    placeholder="Product price"
                    onSave={this.handleProductPriceSave.bind(this) } />);
        }
        return (
            <label onDoubleClick={() => this.setState({ productEditing: ProductEditing.Price }) }>
                {this.props.product.price} &pound;
                </label>);
    }
    renderProductQuantity() {
        return (
            <label>
                {this.props.product.quantity} item(s) in stock
                </label>);
    }
    render() {
        return (
            <div className="product col-xs-12 col-sm-12 col-md-12">
                <div className="row text-center">
                    {this.renderProductName() }
                </div>
                <div className="row">
                    <img className="img-responsive img-rounded product-item-img" src={this.props.product.image} />
                </div>
                <div className="row">
                    <div className="col-xs-12 col-sm-8 col-md-8">
                        <div className="row">
                            <div className="col-xs-12 col-sm-12 col-md-12">
                                {this.renderProductPrice() }
                            </div>
                            <div className="col-xs-12 col-sm-12 col-md-12">
                                {this.renderProductQuantity() }
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-2 col-md-2 v-align">
                        <button type="button" className="btn btn-danger" onClick={this.handleProductDelete.bind(this)}>
                            <span className="glyphicon glyphicon-remove"></span> 
                        </button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-6 col-sm-6 col-md-6">
                        <button type="button" className="btn btn-success" onClick={this.handleProductAddToCart.bind(this)}>
                                ADD TO CART
                            </button>
                    </div>
                    <div className="col-xs-6 col-sm-6 col-md-6">
                        <input 
                            min="1" 
                            max={this.props.product.quantity.toString()}
                            value={this.state.itemQuantityToBuy.toString()} 
                            type="number" 
                            className="form-control" 
                            onChange={this.onQuantityToBuyChange.bind(this)} />
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductItem;
