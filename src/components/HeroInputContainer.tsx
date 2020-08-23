import React, { Component } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { Home, Store, Destination } from './types';
import { DropboxLocationsTable } from './DropboxLocationsTable';
import { Icon } from '@iconify/react';
import searchIcon from '@iconify/icons-fa-solid/search';
import compressIcon from '@iconify/icons-fa-solid/compress';
import expandIcon from '@iconify/icons-fa-solid/expand';

type HeroInputContainerProps = {
  store: Store;
  setHome: (home: Home) => void;
  addDestination: (destination: Destination) => void;
}

type HeroInputContainerState = {
  address: string;
  isVerbose: boolean;
}

export class HeroInputContainer extends Component<HeroInputContainerProps, HeroInputContainerState> {

  public readonly state: Readonly<HeroInputContainerState> = {
    address: '',
    isVerbose: true
  };

  geocodeAddress = () => {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: this.state.address }, this.handleGeocodeResults);
  }

  handleGeocodeResults = (results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus) => {
    console.log('results', results);
    const city = results[0].address_components.find(component => component.types.includes('locality'))?.long_name;
    if (city) {
      const location = results[0].geometry.location;
      const home = {
        address: results[0].formatted_address,
        city,
        location: {
          lat: location.lat(),
          lng: location.lng(),
        },
      };
      this.props.setHome(home);
    } else {
      console.error('No results found.'); // TODO: create visual error
    }
  }

  onAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ address: event.currentTarget.value });
  }

  onAddressKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      this.geocodeAddress();
    }
  }

  toggleDisplay = () => {
    this.setState({ isVerbose: !this.state.isVerbose })
  }

  renderVerboseDisplay = (): JSX.Element => {
    return (
      <Jumbotron className='mt-2' style={{ backgroundColor: '#E3D197', opacity: .85 }}>
        <h1 className='display-4'>Ballot Drop Box Locator</h1>
        <InputGroup className='mb-3'>
          <FormControl
            placeholder='Enter street address or city.'
            aria-label='Enter street address or city.'
            aria-describedby='basic-addon1'
            onChange={this.onAddressChange}
            onKeyPress={this.onAddressKeyPress}
          />
          <InputGroup.Append>
            <Button onClick={this.geocodeAddress} variant='outline-dark'>
              <Icon icon={searchIcon} /> Find
            </Button>
          </InputGroup.Append>
          <InputGroup.Append>
            <Button onClick={this.toggleDisplay} variant='outline-dark'>
              <Icon icon={compressIcon} /> Collapse
            </Button>
          </InputGroup.Append>
        </InputGroup>
        <DropboxLocationsTable
          dropboxLocations={this.props.store.dropboxLocations}
          addDestination={this.props.addDestination}
        />
      </Jumbotron>
    );
  }

  renderConciseDisplay = (): JSX.Element => {
    return (
      <Button className='mt-2' variant='dark' onClick={this.toggleDisplay}>
        <Icon icon={expandIcon} /> Expand
      </Button>
    );
  }

  render() {
    return this.state.isVerbose ? this.renderVerboseDisplay() : this.renderConciseDisplay()
  }
}