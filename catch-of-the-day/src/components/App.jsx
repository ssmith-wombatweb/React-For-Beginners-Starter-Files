import React, { Component } from 'react';

import sampleFishes from '../sample-fishes';

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
    this.loadSamplesFishes = this.loadSamplesFishes.bind(this);
    this.addToOrder = this.addToOrder.bind(this);
  }

  addFish(fish) {
    const { fishes } = { ...this.state };
    fishes[`fish${Date.now()}`] = fish;

    this.setState({ fishes });
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
        <Order fishes={fishes} order={order} />
        <Inventory addFish={this.addFish} loadSampleFishes={this.loadSamplesFishes} />
      </div>
    );
  }
}

App.propTypes = {

};

export default App;
