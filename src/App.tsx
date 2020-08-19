import React, { Component, Props } from 'react';
import './App.css';
import { MapComponent } from './components/MapComponent';
import { OverlayWrapperComponent } from './components/OverlayWrapperComponent';
import { HeroInputContainer } from './components/HeroInputContainer';
import { Home } from './components/types';

type AppState = {
  home: Home,
}

class App extends Component<Props<any>, AppState> {

  constructor(props: any) {
    super(props);
    this.state = {
      home: { lat: 0, lng: 0 }
    }
  }

  setHome = (home: Home) => {
    this.setState({ home });
  }

  render() {
    return (
      <React.Fragment>
        <MapComponent home={this.state.home} />
        <OverlayWrapperComponent>
          <HeroInputContainer home={this.state.home} setHome={this.setHome} />
        </OverlayWrapperComponent>
      </React.Fragment>
    );
  }
}

export default App;
