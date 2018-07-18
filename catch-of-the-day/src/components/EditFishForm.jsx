import React, { Component } from 'react';
import PropTypes from 'prop-types';

class EditFishForm extends Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { fish, updateFish, index } = this.props;
    const { name, value } = e.target;

    const updatedFish = {
      ...fish,
      [name]: value,
    };

    updateFish(index, updatedFish);
  }

  render() {
    const { fish, deleteFish, index } = this.props;
    return (
      <div className="fish-edit">
        <input
          type="text"
          name="name"
          onChange={this.handleChange}
          value={fish.name}
        />
        <input
          type="text"
          name="price"
          onChange={this.handleChange}
          value={fish.price}
        />
        <select
          name="status"
          onChange={this.handleChange}
          value={fish.status}
        >
          <option value="available">
            Fresh
          </option>
          <option value="unavailable">
            Sold Out
          </option>
        </select>
        <textarea
          name="desc"
          onChange={this.handleChange}
          value={fish.desc}
        />
        <input
          type="text"
          name="image"
          onChange={this.handleChange}
          value={fish.image}
        />
        <button type="button" onClick={() => deleteFish(index)}>
          Remove Fish
        </button>
      </div>
    );
  }
}

EditFishForm.propTypes = {
  fish: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    desc: PropTypes.string,
    status: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  deleteFish: PropTypes.func.isRequired,
  updateFish: PropTypes.func.isRequired,
  index: PropTypes.string.isRequired,
};

export default EditFishForm;
