import React, { Component, Props, CSSProperties } from 'react';
import './App.css';
import { MapComponent } from './components/map/Map';
import { OverlayWrapper } from './components/OverlayWrapper';
import { HeroInputContainer } from './components/HeroInputContainer';
import { Home, Store, Destination } from './components/types';
import DropboxLocator from './data/DropboxLocator';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import { InlineIcon } from '@iconify/react';
import closeIcon from '@iconify/icons-fa-solid/window-close';
import searchLocationIcon from '@iconify/icons-fa-solid/search-location';

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
        isHeroContainerOpen: true,
        isSearchingForHome: false,
        isDisplayError: true,
      },
    }
  }

  toggleDisplay = (): void => {
    const store = this.state.store;
    store.isHeroContainerOpen = !this.state.store.isHeroContainerOpen;
    this.setState({ store });
  }

  setHome = (home: Home): void => {
    const store = this.state.store;
    store.home = home;
    store.destinations = [];
    store.dropboxLocations = home.city ? DropboxLocator.filterByCityAndState(home.city, 'MI') : [];
    if (home.location) {
      store.center = { lat: home.location.lat, lng: home.location.lng };
      store.zoom = 11;
    }
    this.setState({ store });
  }

  setSearching = (isSearching: boolean): void => {
    const store = this.state.store;
    store.isSearchingForHome = isSearching;
    this.setState({ store });
  }

  setError = (isDisplayError: boolean): void => {
    const store = this.state.store;
    store.isDisplayError = isDisplayError;
    this.setState({ store });
  }

  addDestination = (destination: Destination): void => {
    const store = this.state.store;
    store.destinations.push(destination);
    this.setState({ store });
  }

  clearDropboxLocations = (): void => {
    const store = this.state.store;
    store.dropboxLocations = [];
    this.setState({ store });
  }
  
  renderHeroCollapseButton = (): JSX.Element => {
    const style: CSSProperties = { cursor: 'pointer', color: '#333333' };
    return (
      <div onClick={this.toggleDisplay}>
        <InlineIcon style={style} className='mt-3 mr-2 float-right' icon={closeIcon} /> 
      </div>
    );
  }

  renderHeroExpandButton = (): JSX.Element => {
    return (
      <Button className='mt-3' variant='dark' size='sm' onClick={this.toggleDisplay}>
         <InlineIcon icon={searchLocationIcon} /> Open Dropbox Locator
      </Button>
    );
  }

  renderHero = (): JSX.Element => {
    return (
      <HeroInputContainer 
        store={this.state.store}
        setHome={this.setHome}
        addDestination={this.addDestination}
        clearDropboxLocations={this.clearDropboxLocations}
        setSearching={this.setSearching}
        setError={this.setError}
      />
    )
  }

  renderSpinner = (): JSX.Element => {
    const style: CSSProperties = { position: 'fixed', top: '47%', left: '47%' };
    return (
      <Spinner style={style} animation='border' role='status'>
        <span className='sr-only'>Loading...</span>
      </Spinner>
    );
  }

  renderError = (): JSX.Element => {
    const style: CSSProperties = { position: 'fixed', bottom: 5, left: '2%', width: '96%' };
    return (
      <Alert variant='danger' style={style} onClose={() => this.setError(false)} dismissible>
        We were unable to add a marker to the map.  Please try again.
      </Alert>
    );
  }

  render = (): JSX.Element => {
    const { isHeroContainerOpen } = this.state.store;
    return (
      <React.Fragment>
        <MapComponent store={this.state.store} />
        <OverlayWrapper>
          { isHeroContainerOpen && this.renderHero() }
        </OverlayWrapper>
        <OverlayWrapper>
          { isHeroContainerOpen && this.renderHeroCollapseButton() }
          { !isHeroContainerOpen && this.renderHeroExpandButton() }
        </OverlayWrapper>
        <OverlayWrapper>
          { this.state.store.isSearchingForHome ? this.renderSpinner() : null }
        </OverlayWrapper>
        <OverlayWrapper>
          { this.state.store.isDisplayError ? this.renderError() : null }
        </OverlayWrapper>
      </React.Fragment>
    );
  }
}

export default App;
