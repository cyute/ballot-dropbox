import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { DropboxLocations } from './table/DropboxLocations';
import { Icon } from '@iconify/react';
import searchIcon from '@iconify/icons-fa-solid/search';
import { StateDropdown } from './input/StateDropdown';
import { RootState } from '../store/types';
import { useDispatch, useSelector } from 'react-redux';
import { updateAddress, geocodeHome } from '../store/user/slice';
import { Title } from './input/Title';
import { UserState } from '../store/user/types';

export const HeroInputContainer = (): JSX.Element => {

  const user = useSelector<RootState, UserState>(state => state.user);
  const dispatch = useDispatch();

  const geocodeAddress = async (): Promise<void> => {
    dispatch(geocodeHome(`${user.address}, ${user.state}`));
  }

  const onAddressKeyPress = (event: React.KeyboardEvent): void => {
    if (event.key === 'Enter') {
      geocodeAddress();
    }
  }

  return (
    <Jumbotron className='mt-2' style={{ backgroundColor: '#E3D197', opacity: .9 }}>
      <Title />
      <InputGroup className='mb-3'>
        <FormControl
          placeholder='Street address and/or city'
          aria-label='Street address and/or city'
          aria-describedby='basic-addon1'
          value={user.address}
          onChange={(event) => dispatch(updateAddress(event.currentTarget.value))}
          onKeyPress={onAddressKeyPress}
        />
        <StateDropdown />
        <InputGroup.Append>
          <Button onClick={geocodeAddress} variant='outline-dark'>
            <Icon icon={searchIcon} />
            <span className='d-none d-sm-inline ml-1'>Find</span>
          </Button>
        </InputGroup.Append>
      </InputGroup>
      <DropboxLocations />
    </Jumbotron>
  );
};
