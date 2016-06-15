import * as React from 'react';

import { Category } from '../models/Category';
import { Product } from '../models/Product';
import { ShoppingCartProduct } from '../models/ShoppingCartProduct';
import CategoriesContainer from '../containers/CategoriesContainer';
import ProductForm from './ProductForm';
import ShoppingCartListContainer from '../containers/ShoppingCartListContainer';
import ProductListContainer from '../containers/ProductListContainer';

interface ShoppingSectionProps {
    categoryId: number;
    actions: any;
};

class ShoppingSection extends React.Component<ShoppingSectionProps, void> {
    constructor(props, context) {
        super(props, context);
    }
    
    addProduct(product: Product){
        product.categoryId = this.props.categoryId;
        this.props.actions.addProduct(product);
    }
    
    renderProductForm(){
        if(!this.props.categoryId){
            return null;
        }
        return (
            <div className="col-xs-12 col-sm-12 col-md-12">
                <button type="button" className="btn btn-lg btn-info collapsed" data-toggle="collapse" data-target="#productForm">
                    Add product
                </button>
                <div id="productForm" className="collapse">
                    <ProductForm onSubmit={this.addProduct.bind(this)}/>
                </div>
            </div>
        );
    }
    
    renderShoppingCart(){
        return (
            <div className="col-xs-12 col-sm-12 col-md-12">
                <button type="button" className="btn btn-lg btn-info collapsed" data-toggle="collapse" data-target="#shoppingCart">
                    Shopping Cart
                </button>
                <div id="shoppingCart" className="collapse">
                    <ShoppingCartListContainer />
                </div>
            </div>
        );
    }

    renderProductList() {
        let props = this.props;
        if(!props.categoryId){
            return null;
        }
        return (
            <div>
                <ProductListContainer />
            </div>
        );
    }

    render() {     
        return (
            <section className="shopping-section">
                {this.renderShoppingCart()}
                <div className="col-md-3">
                    <CategoriesContainer />
                </div>
                <div className="col-md-9">
                    {this.renderProductForm()}
                    {this.renderProductList()}
                </div>
            </section>
        );
    }
}

export default ShoppingSection;
