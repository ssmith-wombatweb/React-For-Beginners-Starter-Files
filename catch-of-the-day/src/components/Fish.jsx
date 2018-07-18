import React from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from '../helpers';


const Fish = ({
  addToOrder, index, details: {
    image, name, price, desc, status,
  },
}) => {
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
      <button type="button" onClick={() => addToOrder(index)} disabled={!isAvailable}>
        {isAvailable
          ? 'Add To Cart'
          : 'Sold Out'}
      </button>
    </li>
  );
};

Fish.propTypes = {
  index: PropTypes.string.isRequired,
  details: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    desc: PropTypes.string,
    status: PropTypes.string,
  }).isRequired,
  addToOrder: PropTypes.func.isRequired,
};


export default Fish;
