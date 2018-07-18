import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { formatPrice } from '../helpers';

class Order extends Component {
  constructor() {
    super();

    this.renderOrder = this.renderOrder.bind(this);
  }

  renderOrder(key) {
    const { fishes, order, deleteOrderItem } = this.props;
    const fish = fishes[key];
    const count = order[key];
    const isAvailable = fish && fish.status === 'available';
    const transitionOptions = {
      classNames: 'order',
      key,
      timeout: { enter: 500, exit: 500 },
    };

    if (!fish) return null;
    if (!isAvailable) {
      return (
        <CSSTransition {...transitionOptions}>
          <li key={key}>
            {`Sorry ${fish ? fish.name : 'fish'} is no longer available.`}
            <button
              type="button"
              onClick={() => deleteOrderItem(key)}
            >
            &times;
            </button>
          </li>
        </CSSTransition>
      );
    }
    return (
      <CSSTransition {...transitionOptions}>
        <li key={key}>
          <span>
            <TransitionGroup component="span" className="count">
              <CSSTransition
                component="span"
                classNames="count"
                key={count}
                timeout={{ enter: 500, exit: 500 }}
              >
                <span>
                  {count}
                </span>
              </CSSTransition>
            </TransitionGroup>
            {`lbs ${fish.name} ${formatPrice(count * fish.price)}`}
            <button
              type="button"
              onClick={() => deleteOrderItem(key)}
            >
          X
            </button>
          </span>
        </li>
      </CSSTransition>
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

        <TransitionGroup component="ul" className="order">
          {orderIds.map(key => this.renderOrder(key))}
        </TransitionGroup>
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
  fishes: PropTypes.objectOf(PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    desc: PropTypes.string,
    status: PropTypes.string,
  })).isRequired,
  order: PropTypes.objectOf(PropTypes.number).isRequired,
  deleteOrderItem: PropTypes.func.isRequired,
};

export default Order;
