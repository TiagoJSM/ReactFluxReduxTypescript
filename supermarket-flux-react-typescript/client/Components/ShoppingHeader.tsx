import * as React from 'react';

interface ShoppingHeaderProps {
};

class ShoppingHeader extends React.Component<ShoppingHeaderProps, void> {

  render() {
    return (
      <div className="jumbotron">
          <h1>Shopping with FB's Flux</h1>
      </div>
    );
  }
}

export default ShoppingHeader;
