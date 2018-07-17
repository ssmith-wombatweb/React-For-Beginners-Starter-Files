import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from '../helpers';

class Fish extends Component {
  render() {
    const {
      image, name, price, desc, status,
    } = this.props.details;
    const { addToOrder, index } = this.props;
    const isAvailable = status === 'available';
    return (
      <li className="menu-fish">
        <img
          src={image}
          alt={name}
        />
        <h3 className="fish-name">
          {name}
          <span className="price">
            {formatPrice(price)}
          </span>
        </h3>
        <p>
          {desc}
        </p>
        <button onClick={() => addToOrder(index)} disabled={!isAvailable}>
          {isAvailable
            ? 'Add To Cart'
            : 'Sold Out'}
        </button>
      </li>
    );
  }
}

Fish.propTypes = {

};

export default Fish;
