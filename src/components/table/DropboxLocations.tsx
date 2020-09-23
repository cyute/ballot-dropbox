import React, { Component } from 'react';
import { DropboxLocation } from '../../data/types';
import Form from 'react-bootstrap/Form';
import { Destination } from '../types';
import { DropboxLocationsTable } from './DropboxLocationsTable';

type DropboxLocationsProps = {
  dropboxLocations: DropboxLocation[];
  addDestination: (destination: Destination) => void;
  setSearching: (isSearching: boolean) => void;
}

type DropboxLocationsState = {
  isOutdoorsOnly: boolean;
  isOpen24Hours: boolean;
}

export class DropboxLocations extends Component<DropboxLocationsProps, DropboxLocationsState> {

  public readonly state: Readonly<DropboxLocationsState> = {
    isOutdoorsOnly: false,
    isOpen24Hours: false,
  };

  toggleOutdoors = (): void => {
    this.setState({ isOutdoorsOnly: !this.state.isOutdoorsOnly });
  }

  toggle24Hours = (): void => {
    this.setState({ isOpen24Hours: !this.state.isOpen24Hours });
  }

  renderDisclaimer = (): JSX.Element => {
    const { dropboxLocations } = this.props;
    if (dropboxLocations[0].state === 'MI') {
      return (
        <div>
          <small className='text-danger' style={{ fontWeight: 300 }}>
            <sup>*</sup> Voters must only use the drop box in their jurisdiction
          </small>
        </div>
      )
    }
    return <React.Fragment />;
  }

  render = (): JSX.Element => {
    const { dropboxLocations } = this.props;
    if (dropboxLocations.length === 0) {
      return <React.Fragment />;
    }
    return (
      <div className='table-responsive'>
        <div className='float-left'>
          <p className='lead mb-1'>
           { dropboxLocations[0].city }, { dropboxLocations[0].state }
          </p>
        </div>
        <div className='float-right' style={{ lineHeight: '2rem' }}>
          <Form.Check inline 
            label='outdoors'
            type='checkbox' 
            id={`inline-radio-1`}
            checked={this.state.isOutdoorsOnly}
            onChange={this.toggleOutdoors}
          />
          <Form.Check inline
            label='24/7'
            type='checkbox'
            id={`inline-radio-2`}
            checked={this.state.isOpen24Hours} 
            onChange={this.toggle24Hours}
          />
        </div>
        <DropboxLocationsTable
          addDestination={this.props.addDestination}
          dropboxLocations={dropboxLocations}
          setSearching={this.props.setSearching}
          isOpen24Hours={this.state.isOpen24Hours}
          isOutdoorsOnly={this.state.isOutdoorsOnly}
        />
        { this.renderDisclaimer() }
      </div>
    );
  }
}
