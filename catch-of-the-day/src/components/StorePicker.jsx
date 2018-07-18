import React from 'react';
import PropTypes from 'prop-types';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
  constructor() {
    super();

    this.myInput = React.createRef();
    this.goToStore = this.goToStore.bind(this);
  }

  goToStore(e) {
    const { history } = this.props;
    e.preventDefault();
    const storeName = this.myInput.value.value;
    history.push(`/store/${storeName}`);
  }

  render() {
    return (
      <form
        className="store-selector"
        onSubmit={this.goToStore}
      >
        <h2>
          Please Enter A Store
        </h2>
        <input
          type="text"
          ref={this.myInput}
          required
          placeholder="Store Name"
          defaultValue={getFunName()}
        />
        <button type="submit">
          {'Visit Store ->'}
        </button>
      </form>
    );
  }
}

StorePicker.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default StorePicker;
