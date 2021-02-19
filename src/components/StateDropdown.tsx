import React, { Component } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { updateState } from '../store/user/slice';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../store/types';

const mapStateToProps = (state: RootState) => ({
  user: state.user,
});

const connector = connect(mapStateToProps, { updateState });

type PropsFromRedux = ConnectedProps<typeof connector>

class StateDropdown extends Component<PropsFromRedux> {

  render = (): JSX.Element => {
    const { updateState, user } = this.props;
    return (
      <DropdownButton
        as={InputGroup.Append}
        variant='outline-dark'
        title={user.state}
        id='input-group-dropdown-2'
      >
        <Dropdown.Header>States</Dropdown.Header>
        <Dropdown.Item href='#' eventKey='1' onSelect={() => updateState('MI')}>MI</Dropdown.Item>
        <Dropdown.Item href='#' eventKey='2' onSelect={() => updateState('OH')}>OH</Dropdown.Item>
        <Dropdown.Item href='#' eventKey='3' onSelect={() => updateState('PA')}>PA</Dropdown.Item>
      </DropdownButton>
    );
  }
}

export default connector(StateDropdown);