import * as React from 'react';

import TextInput from './TextInput';
import { Product } from '../models/Product';

interface ProductFormProps {
    onSubmit: Function
};

interface ProductFormState {
    name?: string;
    image?: string;
    price?: number;
    quantity?: number;
};

class ProductForm extends React.Component<ProductFormProps, ProductFormState> {
    constructor(props, context) {
        super(props, context);
        this.resetState();
    }
    
    resetState(){
        this.state = {
            name: "",
            image: "",
            price: 0,
            quantity: 0
        };
    }

    onNameChange(e){
        this.setState({ name: e.target.value });
    }
    onImageChange(e){
        this.setState({ image: e.target.value });
    }
    onPriceChange(e){
        this.setState({ price: e.target.value });
    }
    onQuantityChange(e){
        this.setState({ quantity: e.target.value });
    }
    
    handleClick(){
        let product: Product = {
            image: this.state.image,
            name:  this.state.name,
            price:  this.state.price,
            quantity:  this.state.quantity,
            id: 0,
            categoryId: 0
        };
        this.props.onSubmit(product);
        this.resetState();
    }
    render() {
        return (
            <div>
                <label>Name:</label>
                <input 
                    className="form-control"
                    placeholder="Product name"
                    autoFocus={true}
                    value={this.state.name}
                    onChange={this.onNameChange.bind(this)} />
                    
                <label>Image:</label>
                <input 
                    className="form-control"
                    placeholder="Product image"
                    autoFocus={true}
                    value={this.state.image}
                    onChange={this.onImageChange.bind(this)} />
                    
                <label>Price:</label>
                <input 
                    className="form-control"
                    placeholder="Product price"
                    autoFocus={true}
                    value={this.state.price ? this.state.price.toString() : ''}
                    onChange={this.onPriceChange.bind(this)} 
                    type="number" />
                    
                <label>Quantity:</label>
                <input 
                    className="form-control"
                    placeholder="Product quantity"
                    autoFocus={true}
                    value={this.state.quantity ? this.state.quantity.toString() : ''}
                    onChange={this.onQuantityChange.bind(this)} 
                    type="number" />
                    
                <button 
                    type="button" 
                    className="btn btn-success"
                    onClick={this.handleClick.bind(this)}>
                        Submit
                    </button>
                </div>
        );
    }
}

export default ProductForm;
