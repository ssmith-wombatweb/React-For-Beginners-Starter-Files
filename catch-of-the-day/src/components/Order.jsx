import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { formatPrice } from '../helpers';

class Order extends Component {
  constructor() {
    super();

    this.renderOrder = this.renderOrder.bind(this);
  }

  renderOrder(key) {
    const { fishes, order } = this.props;
    const fish = fishes[key];
    const count = order[key];
    const isAvailable = fish.status === 'available';
    if (!isAvailable) {
      return (
        <li key={key}>
          {`Sorry ${fish ? fish.name : 'fish'} is no longer available.`}
        </li>
      );
    }
    return (
      <li key={key}>
        {`${count} lbs ${fish.name} ${formatPrice(count * fish.price)}`}
      </li>
    );
  }

  render() {
    const { fishes, order } = this.props;
    const orderIds = Object.keys(order);
    const total = orderIds.reduce(((prevTotal, key) => {
      const fish = fishes[key];
      const count = order[key];
      const isAvailable = fish && fish.status === 'available';

      if (isAvailable) return prevTotal + (count * fish.price);
      return prevTotal;
    }), 0);
    return (
      <div className="order-wrap">
        <h2>
          Order
        </h2>
        <ul className="order">
          {orderIds.map(key => this.renderOrder(key))}
        </ul>
        <div className="total">
          <strong>
            {formatPrice(total)}
          </strong>
        </div>
      </div>
    );
  }
}

Order.propTypes = {

};

export default Order;
