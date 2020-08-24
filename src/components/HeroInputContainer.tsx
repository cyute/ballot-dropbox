import React, { Component } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { Home, Store, Destination } from './types';
import { DropboxLocationsTable } from './DropboxLocationsTable';
import { Icon } from '@iconify/react';
import searchIcon from '@iconify/icons-fa-solid/search';

type HeroInputContainerProps = {
  store: Store;
  setHome: (home: Home) => void;
  addDestination: (destination: Destination) => void;
}

type HeroInputContainerState = {
  address: string;
}

export class HeroInputContainer extends Component<HeroInputContainerProps, HeroInputContainerState> {

  public readonly state: Readonly<HeroInputContainerState> = {
    address: '',
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

  renderHero = (): JSX.Element => {
    return (
      <Jumbotron className='mt-2' style={{ backgroundColor: '#E3D197', opacity: .85 }}>
        <h1 className='d-none d-sm-block display-4'>Ballot Drop Box Locator</h1>
        <h1 style={{ fontSize: '2em' }} className='d-block d-sm-none display-4'>Ballot Drop Box Locator</h1>
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
              <Icon icon={searchIcon} />
              <span className='d-none d-sm-inline ml-1'>Find</span>
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

  render() {
    return this.renderHero();
  }
}