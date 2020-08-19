import React, { Component } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { Home } from './types';

type HeroInputContainerProps = {
  home: Home;
  setHome: (home: Home) => void;
}

type HeroInputContainerState = {
  address: string;
}

export class HeroInputContainer extends Component<HeroInputContainerProps, HeroInputContainerState> {

  onClick = () => {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: this.state.address }, this.callback);
  }

  onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ address: event.currentTarget.value });
  }

  callback = (results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus) => {
    console.log('results', results);
    const location = results[0].geometry.location;
    const home = {
      lat: location.lat(),
      lng: location.lng(),
    };
    this.props.setHome(home);
  }

  render() {
    return (
      <Jumbotron className='mt-2' style={{ backgroundColor: 'white', opacity: .75 }}>
        <h1>Michigan Ballot Drop Box Locator</h1>
        <p>
          This will be a simple tool that allows you to locate your ballot drop box based on
          your home address.
        </p>
        <InputGroup className="mb-3">
          <FormControl placeholder="Address" aria-label="Address" aria-describedby="basic-addon1" onChange={this.onChange} />
          <InputGroup.Append>
            <Button onClick={(event) => this.onClick()} variant="outline-secondary">
              Find Dropbox
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </Jumbotron>
    )
  }
}