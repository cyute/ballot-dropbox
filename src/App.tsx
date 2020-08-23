import React, { Component, Props } from 'react';
import './App.css';
import { MapComponent } from './components/map/MapComponent';
import { OverlayWrapperComponent } from './components/OverlayWrapperComponent';
import { HeroInputContainer } from './components/HeroInputContainer';
import { Home, Store, Destination } from './components/types';
import DropboxLocator from './data/DropboxLocator';

type AppState = {
  store: Store,
}

class App extends Component<Props<any>, AppState> {

  constructor(props: any) {
    super(props);
    this.state = {
      store: {
        dropboxLocations: [],
        destinations: [],
      }
    }
  }

  setHome = (home: Home) => {
    const store = this.state.store;
    store.home = home;
    store.dropboxLocations = home.city ? DropboxLocator.filterByCityAndState(home.city, 'MI') : [];
    if (home.location) {
      store.center = { lat: home.location.lat, lng: home.location.lng };
      store.zoom = 11;
    }
    this.setState({ store });
  }

  addDestination = (destination: Destination) => {
    const store = this.state.store;
    store.destinations.push(destination);
    this.setState({ store });
  }

  render() {
    return (
      <React.Fragment>
        <MapComponent store={this.state.store} />
        <OverlayWrapperComponent>
          <HeroInputContainer store={this.state.store} setHome={this.setHome} addDestination={this.addDestination} />
        </OverlayWrapperComponent>
      </React.Fragment>
    );
  }
}

export default App;
