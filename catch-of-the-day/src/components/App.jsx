import React, { Component } from 'react';
import PropTypes from 'prop-types';

import sampleFishes from '../sample-fishes';
import base from '../base';

import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import Fish from './Fish';

class App extends Component {
  constructor() {
    super();

    this.state = {
      fishes: {},
      order: {},
    };

    this.addFish = this.addFish.bind(this);
    this.updateFish = this.updateFish.bind(this);
    this.deleteFish = this.deleteFish.bind(this);
    this.deleteOrderItem = this.deleteOrderItem.bind(this);
    this.loadSamplesFishes = this.loadSamplesFishes.bind(this);
    this.addToOrder = this.addToOrder.bind(this);
  }

  componentDidMount() {
    const { match } = this.props;
    const { params } = match;

    const localStorageRef = localStorage.getItem(params.storeId);

    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }

    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: 'fishes',
    });
  }

  componentDidUpdate() {
    const { match } = this.props;
    const { params } = match;

    const { order } = this.state;

    localStorage.setItem(params.storeId, JSON.stringify(order));
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addFish(fish) {
    const { fishes } = { ...this.state };
    fishes[`fish${Date.now()}`] = fish;

    this.setState({ fishes });
  }

  updateFish(key, fish) {
    const { fishes } = { ...this.state };
    fishes[key] = fish;

    this.setState({ fishes });
  }

  deleteFish(key) {
    const { fishes } = { ...this.state };
    fishes[key] = null;

    this.setState({ fishes });
  }

  deleteOrderItem(key) {
    const { order } = { ...this.state };
    delete order[key];
    this.setState({ order });
  }

  loadSamplesFishes() {
    this.setState({ fishes: sampleFishes });
  }

  addToOrder(key) {
    const { order } = { ...this.state };
    order[key] = order[key] + 1 || 1;
    this.setState({ order });
  }

  render() {
    const { fishes, order } = this.state;
    const { match } = this.props;
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(fishes).map(key => (
              <Fish
                key={key}
                details={fishes[key]}
                index={key}
                addToOrder={this.addToOrder}
              />
            ))}
          </ul>
        </div>
        <Order
          fishes={fishes}
          order={order}
          deleteOrderItem={this.deleteOrderItem}
        />
        <Inventory
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSamplesFishes}
          fishes={fishes}
          storeId={match.params.storeId}
        />
      </div>
    );
  }
}

App.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      storeId: PropTypes.string,
    }),
  }).isRequired,
};

export default App;
