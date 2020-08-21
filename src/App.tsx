import React, { Component, Props } from 'react';
import './App.css';
import { MapComponent } from './components/map/MapComponent';
import { OverlayWrapperComponent } from './components/OverlayWrapperComponent';
import { HeroInputContainer } from './components/HeroInputContainer';
import { Home, Store, TargetLocation } from './components/types';
import DropboxLocator from './data/DropboxLocator';

type AppState = {
  store: Store,
}

class App extends Component<Props<any>, AppState> {

  constructor(props: any) {
    super(props);
    this.state = {
      store: {
        home: { lat: 0, lng: 0 },
        targetLocation: { lat: 0, lng: 0 },
        dropboxLocations: [],
      }
    }
  }

  setHome = (home: Home) => {
    const store = this.state.store;
    store.home = home;
    store.dropboxLocations = home.city ? DropboxLocator.filterByCityAndState(home.city, 'MI') : [];
    this.setState({ store });
  }

  addLocation = (targetLocation: TargetLocation) => {
    const store = this.state.store;
    store.targetLocation = targetLocation;
    this.setState({ store });
  }

  render() {
    return (
      <React.Fragment>
        <MapComponent store={this.state.store} />
        <OverlayWrapperComponent>
          <HeroInputContainer store={this.state.store} setHome={this.setHome} addLocation={this.addLocation} />
        </OverlayWrapperComponent>
      </React.Fragment>
    );
  }
}

export default App;
