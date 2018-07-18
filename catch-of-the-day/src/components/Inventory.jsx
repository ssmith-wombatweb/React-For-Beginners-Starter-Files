import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';

import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';
import Login from './Login';
import base, { firebaseApp } from '../base';

class Inventory extends React.Component {
  constructor() {
    super();

    this.state = {
      uid: null,
      owner: null,
    };

    this.authenticate = this.authenticate.bind(this);
    this.authHandler = this.authHandler.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.authHandler({ user });
      }
    });
  }

  authenticate(provider) {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();

    firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler);
  }

  async authHandler(authData) {
    const { storeId } = this.props;
    const store = await base.fetch(storeId, { context: this });

    if (!store.owner) {
      await base.post(`${storeId}/owner`, {
        data: authData.user.uid,
      });
    }

    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid,
    });
  }

  async logout() {
    await firebase.auth().signOut();
    this.setState({ uid: null });
  }

  render() {
    const {
      addFish, updateFish, deleteFish, loadSampleFishes, fishes,
    } = this.props;
    const { uid, owner } = this.state;

    const logout = (
      <button type="button" onClick={this.logout}>
        Log Out!
      </button>
    );
    if (!uid) {
      return <Login authenticate={this.authenticate} />;
    }

    if (uid !== owner) {
      return (
        <div>
          <p>
            Sorry you are not the owner.
          </p>
          {logout}
        </div>
      );
    }

    return (
      <div className="inventory">
        <h2>
          Inventory
        </h2>
        {logout}
        {Object.keys(fishes)
          .map(key => (
            <EditFishForm
              key={key}
              fish={fishes[key]}
              updateFish={updateFish}
              deleteFish={deleteFish}
              index={key}
            />
          ))}
        <AddFishForm addFish={addFish} />
        <button type="button" onClick={loadSampleFishes}>
      Load Sample Fishes
        </button>
      </div>
    );
  }
}

Inventory.propTypes = {
  addFish: PropTypes.func.isRequired,
  updateFish: PropTypes.func.isRequired,
  deleteFish: PropTypes.func.isRequired,
  loadSampleFishes: PropTypes.func.isRequired,
  fishes: PropTypes.objectOf(PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    desc: PropTypes.string,
    status: PropTypes.string,
  })).isRequired,
  storeId: PropTypes.string.isRequired,
};

export default Inventory;
