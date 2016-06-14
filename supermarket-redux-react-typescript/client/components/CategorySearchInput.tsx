import * as React from 'react';
import * as classNames from 'classnames';

interface CategorySearchInputProps {
  onEnterPress: Function;
  text?: string;
  placeholder?: string,
}
interface CategorySearchInputState {
  text: string;
}

class CategorySearchInput extends React.Component<CategorySearchInputProps, CategorySearchInputState> {
  constructor(props, context) {
    super(props, context);
    this.state = {
      text: this.props.text || ''
    };
  }

  handleKeyDown(e) {
    const text = e.target.value.trim();
    if (e.which === 13) {
      this.props.onEnterPress(text);
    }
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  render() {
    return (
      <input
        className="form-control vert-offset-bottom-1"
        type="text"
        placeholder={this.props.placeholder}
        autoFocus={true}
        value={this.state.text}
        onChange={this.handleChange.bind(this)}
        onKeyDown={this.handleKeyDown.bind(this)} />
    );
  }
}


export default CategorySearchInput;
