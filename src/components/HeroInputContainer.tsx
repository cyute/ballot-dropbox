import React, { Component } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import DropboxLocations from './table/DropboxLocations';
import { Icon } from '@iconify/react';
import searchIcon from '@iconify/icons-fa-solid/search';
import StateDropdown from './StateDropdown';
import { RootState } from '../store/types';
import { connect, ConnectedProps } from 'react-redux';
import { updateAddress, geocodeHome } from '../store/user/slice';

const mapStateToProps = (state: RootState) => ({
  user: state.user,
});

const connector = connect(mapStateToProps, { updateAddress, geocodeHome });

type PropsFromRedux = ConnectedProps<typeof connector>

class HeroInputContainer extends Component<PropsFromRedux> {

  geocodeAddress = async (): Promise<void> => {
    this.props.geocodeHome(`${this.props.user.address}, ${this.props.user.state}`);
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
            value={this.props.user.address}
            onChange={(event) => this.props.updateAddress(event.currentTarget.value)}
            onKeyPress={this.onAddressKeyPress}
          />
          <StateDropdown />
          <InputGroup.Append>
            <Button onClick={this.geocodeAddress} variant='outline-dark'>
              <Icon icon={searchIcon} />
              <span className='d-none d-sm-inline ml-1'>Find</span>
            </Button>
          </InputGroup.Append>
        </InputGroup>
        <DropboxLocations />
      </Jumbotron>
    );
  }
}

export default connector(HeroInputContainer);