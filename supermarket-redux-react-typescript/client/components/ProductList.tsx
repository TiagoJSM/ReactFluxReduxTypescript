import * as React from 'react';

import { Product } from '../models/Product';

import ProductItem from './ProductItem';

interface ProductListProps {
    products?: Product[];
    actions?: any;
};

class ProductList extends React.Component<ProductListProps, void> {
    render() {
        let products = this.props.products;
        let actions = this.props.actions;
        if(products == null){
            products = [];
        }
        
        return (
            <section className="product-list">
                {products.map(product =>
                    <div className="col-xs-6 col-sm-4 col-md-4">
                        <ProductItem 
                            product={product} 
                            editProductName={actions.productNameChange}
                            editProductPrice={actions.productPriceChange}
                            editProductQuantity={actions.productQuantityChange} 
                            deleteProduct={actions.deleteProduct}
                            addProductToCart={actions.addProductToCart}
                            />
                    </div>
                )}
            </section>
        );
    }
}

export default ProductList;
