import React from 'react';
import PropTypes from 'prop-types';

import AddFishForm from './AddFishForm';

const Inventory = ({ addFish, loadSampleFishes }) => (
  <div className="inventory">
    <h2>
      Inventory
    </h2>
    <AddFishForm addFish={addFish} />
    <button type="button" onClick={loadSampleFishes}>
      Load Sample Fishes
    </button>
  </div>
);

Inventory.propTypes = {
  addFish: PropTypes.func.isRequired,
  loadSampleFishes: PropTypes.func.isRequired,
};

export default Inventory;
