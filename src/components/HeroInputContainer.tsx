import React, { Component } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { Home, Store, TargetLocation } from './types';
import { DropboxLocationsTable } from './DropboxLocationsTable';
import { Icon } from '@iconify/react';
import searchIcon from '@iconify/icons-fa-solid/search';

type HeroInputContainerProps = {
  store: Store;
  setHome: (home: Home) => void;
  addLocation: (targetLocation: TargetLocation) => void;
}

type HeroInputContainerState = {
  address: string;
}

export class HeroInputContainer extends Component<HeroInputContainerProps, HeroInputContainerState> {

  geocodeAddress = () => {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: this.state.address }, this.handleGeocodeResults);
  }

  handleGeocodeResults = (results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus) => {
    console.log('results', results);
    const city = results[0].address_components.find(component => component.types.includes('locality'))?.long_name;
    const location = results[0].geometry.location;
    const home = {
      lat: location.lat(),
      lng: location.lng(),
      city,
    };
    this.props.setHome(home);
  }

  onAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ address: event.currentTarget.value });
  }

  onAddressKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      this.geocodeAddress();
    }
  }

  render() {
    return (
      <Jumbotron className='mt-2' style={{ backgroundColor: '#E3D197', opacity: .85 }}>
        <h1 className='display-4'>Ballot Drop Box Locator</h1>
        <InputGroup className='mb-3'>
          <FormControl 
            placeholder='Enter your address or city to locate your ballot drop box.'
            aria-label='Enter your address or city to locate your ballot drop box.'
            aria-describedby='basic-addon1'
            onChange={this.onAddressChange}
            onKeyPress={this.onAddressKeyPress}
          />
          <InputGroup.Append>
            <Button onClick={this.geocodeAddress} variant='outline-secondary'>
              <Icon icon={searchIcon} /> Find
            </Button>
          </InputGroup.Append>
        </InputGroup>
        <DropboxLocationsTable 
          dropboxLocations={this.props.store.dropboxLocations}
          addLocation={this.props.addLocation}
        />
      </Jumbotron>
    )
  }
}