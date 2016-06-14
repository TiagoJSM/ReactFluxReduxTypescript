import * as React from 'react';

interface TextInputProps {
    type?: string;
    text?: string;
    placeholder?: string,
    onChange?: Function;
}
interface TextInputState {
    text: string;
}

class TextInput extends React.Component<TextInputProps, TextInputState> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            text: this.props.text || ''
        };
    }

    handleChange(e) {
        if(this.props.onChange){
            this.props.onChange(e.target.value);
        }
        this.setState({ text: e.target.value });
    }

    render() {
        let type = this.props.type || '';

        return (
            <input
                className="form-control"
                type={type}
                placeholder={this.props.placeholder}
                autoFocus={true}
                value={this.state.text}
                onChange={this.handleChange.bind(this) as React.EventHandler<React.FormEvent>} />
        );
    }
}


export default TextInput;
