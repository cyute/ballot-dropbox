import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { updateState } from '../../store/user/slice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/types';

export const StateDropdown = (): JSX.Element => {
  const state = useSelector<RootState, string>(state => state.user.state);
  const dispatch = useDispatch();

  return (
    <DropdownButton
      as={InputGroup.Append}
      variant='outline-dark'
      title={state}
      id='input-group-dropdown-2'
    >
      <Dropdown.Header>States</Dropdown.Header>
      <Dropdown.Item href='#' eventKey='1' onSelect={() => dispatch(updateState('MI'))}>MI</Dropdown.Item>
      <Dropdown.Item href='#' eventKey='2' onSelect={() => dispatch(updateState('OH'))}>OH</Dropdown.Item>
      <Dropdown.Item href='#' eventKey='3' onSelect={() => dispatch(updateState('PA'))}>PA</Dropdown.Item>
    </DropdownButton>
  );
};
