import * as React from 'react';

interface ProductItemTextInputProps {
    onSave: Function;
    text?: string;
    placeholder?: string
}
interface ProductItemTextInputState {
    text: string;
}

class ProductItemTextInput extends React.Component<ProductItemTextInputProps, ProductItemTextInputState> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            text: this.props.text || ''
        };
    }

    handleSubmit(e) {
        const text = e.target.value.trim();
        if (e.which === 13) {
            this.props.onSave(text);
        }
    }

    handleChange(e) {
        this.setState({ text: e.target.value });
    }

    handleBlur(e) {
        this.props.onSave(e.target.value);
    }

    render() {
        return (
            <input
                type="text"
                placeholder={this.props.placeholder}
                autoFocus={true}
                value={this.state.text}
                onBlur={this.handleBlur.bind(this) as React.EventHandler<React.FormEvent>}
                onChange={this.handleChange.bind(this) as React.EventHandler<React.FormEvent>}
                onKeyDown={this.handleSubmit.bind(this) as React.EventHandler<React.FormEvent>} />
        );
    }
}


export default ProductItemTextInput;
