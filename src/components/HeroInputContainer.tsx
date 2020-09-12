import React, { Component } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { Home, Store, Destination } from './types';
import { DropboxLocations } from './table/DropboxLocations';
import { Icon } from '@iconify/react';
import searchIcon from '@iconify/icons-fa-solid/search';
import { LocationClient } from '../data/LocationClient';

type HeroInputContainerProps = {
  store: Store;
  setHome: (home: Home) => void;
  addDestination: (destination: Destination) => void;
  clearDropboxLocations: () => void;
  setSearching: (isSearching: boolean) => void;
  setError: (isError: boolean) => void;
}

type HeroInputContainerState = {
  address: string;
}

export class HeroInputContainer extends Component<HeroInputContainerProps, HeroInputContainerState> {

  private locationClient: LocationClient;

  constructor(props: HeroInputContainerProps) {
    super(props);
    this.locationClient = new LocationClient();
  }

  public readonly state: Readonly<HeroInputContainerState> = {
    address: '',
  };

  geocodeAddress = async (): Promise<void> => {
    this.props.clearDropboxLocations();
    this.props.setSearching(true);

    const response = await this.locationClient.get(`${this.state.address}, MI`);
    this.props.setSearching(false);
    if (response.location) {
      this.props.setHome(response.location);
    } else {
      this.props.setError(true);
    }
    this.setState({ address: '' });
  }

  onAddressChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ address: event.currentTarget.value });
  }

  onAddressKeyPress = (event: React.KeyboardEvent): void => {
    if (event.key === 'Enter') {
      this.geocodeAddress();
    }
  }

  renderTitle = (): JSX.Element => {
    return (
      <React.Fragment>
        <h1 className='d-none d-sm-block display-4'>Ballot Drop Box Locator</h1>
        <h1 style={{ fontSize: '1.75em' }} className='d-block d-sm-none display-4'>Ballot Drop Box Locator</h1>
      </React.Fragment>
    )
  }

  render = (): JSX.Element => {
    return (
      <Jumbotron className='mt-2' style={{ backgroundColor: '#E3D197', opacity: .9 }}>
        { this.renderTitle() }
        <InputGroup className='mb-3'>
          <FormControl
            placeholder='Street address and/or city'
            aria-label='Street address and/or city'
            aria-describedby='basic-addon1'
            value={this.state.address}
            onChange={this.onAddressChange}
            onKeyPress={this.onAddressKeyPress}
          />
          <DropdownButton
            as={InputGroup.Append}
            variant='outline-dark'
            title='MI'
            id='input-group-dropdown-2'
          >
            <Dropdown.Header>States</Dropdown.Header>
            <Dropdown.Item href='#'>MI</Dropdown.Item>
          </DropdownButton>
          <InputGroup.Append>
            <Button onClick={this.geocodeAddress} variant='outline-dark'>
              <Icon icon={searchIcon} />
              <span className='d-none d-sm-inline ml-1'>Find</span>
            </Button>
          </InputGroup.Append>
        </InputGroup>
        <DropboxLocations
          dropboxLocations={this.props.store.dropboxLocations}
          addDestination={this.props.addDestination}
          setSearching={this.props.setSearching}
        />
      </Jumbotron>
    );
  }
}