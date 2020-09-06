import React, { Component, Props, CSSProperties } from 'react';
import './App.css';
import { MapComponent } from './components/map/Map';
import { OverlayWrapper } from './components/OverlayWrapper';
import { HeroInputContainer } from './components/HeroInputContainer';
import { Home, Store, Destination } from './components/types';
import DropboxLocator from './data/DropboxLocator';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
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
      },
    }
  }

  toggleDisplay = () => {
    const store = this.state.store;
    store.isHeroContainerOpen = !this.state.store.isHeroContainerOpen;
    this.setState({ store });
  }

  setHome = (home: Home) => {
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

  setSearching = (isSearching: boolean) => {
    const store = this.state.store;
    store.isSearchingForHome = isSearching;
    this.setState({ store });
  }

  addDestination = (destination: Destination) => {
    const store = this.state.store;
    store.destinations.push(destination);
    this.setState({ store });
  }

  clearDropboxLocations = () => {
    const store = this.state.store;
    store.dropboxLocations = [];
    this.setState({ store });
  }
  
  renderHeroCollapseButton = (): JSX.Element => {
    const style: CSSProperties = { cursor: 'pointer', fontSize: '1.25rem', color: '#333333' };
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

  render() {
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
      </React.Fragment>
    );
  }
}

export default App;
