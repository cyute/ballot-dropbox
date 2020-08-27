import React, { Component } from 'react';
import { DropboxLocation } from '../../data/types';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import { Destination } from '../types';
import { Comment } from './Comment';

type DropboxLocationsTableProps = {
  dropboxLocations: DropboxLocation[];
  addDestination: (destination: Destination) => void;
}

type DropboxLocationsTableState = {
  isOutdoorsOnly: boolean;
  isOpen24Hours: boolean;
}

export class DropboxLocationsTable extends Component<DropboxLocationsTableProps, DropboxLocationsTableState> {

  public readonly state: Readonly<DropboxLocationsTableState> = {
    isOutdoorsOnly: false,
    isOpen24Hours: false,
  };

  toggleOutdoors = () => {
    this.setState({ isOutdoorsOnly: !this.state.isOutdoorsOnly });
  }

  toggle24Hours = () => {
    this.setState({ isOpen24Hours: !this.state.isOpen24Hours });
  }

  // TODO: make geocoder class to DRY up code
  geocodeAddress = (location: DropboxLocation) => {
    const geocoder = new google.maps.Geocoder();
    const address = `${location.address} ${location.city} MI`;
    geocoder.geocode({ address }, this.handleGeocodeResults);
  }

  handleGeocodeResults = (results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus) => {
    console.log('results', results);
    const city = results[0].address_components.find(component => component.types.includes('locality'))?.long_name;
    if (city) {
      const location = results[0].geometry.location;
      const dropboxLocation = {
        address: results[0].formatted_address,
        location: {
          lat: location.lat(),
          lng: location.lng(),
        },
      };
      this.props.addDestination(dropboxLocation);
    } else {
      console.error('No results found.'); // TODO: create visual error
    }
  }

  renderRow = (location: DropboxLocation, index: number) => {
    const { address, comments, jurisdiction, isOutdoors, dropoffHours } = location;
    return (
      <tr key={index} onClick={(event) => this.geocodeAddress(location)}>
        <td>{jurisdiction}</td>
        <td>{address}</td>
        <td>
          <Comment 
            address={address}
            isOutdoors={isOutdoors}
            dropoffHours={dropoffHours}
            comments={comments}
          />
        </td>
      </tr>
    )
  }

  getDropboxLocations = (): DropboxLocation[] => {
    return this.props.dropboxLocations.filter(location => {
      if (this.state.isOutdoorsOnly && !location.isOutdoors) {
        return false;
      }
      if (this.state.isOpen24Hours && location.dropoffHours !== '24/7') {
        return false;
      }
      return true;
    });
  }

  render() {
    const dropboxLocations = this.getDropboxLocations();
    if (dropboxLocations.length === 0) {
      return React.Fragment;
    }
    return (
      <div className='table-responsive'>
        <div className='float-left'>
          <p className='lead mb-1'>
           { dropboxLocations[0].city }, MI
          </p>
        </div>
        <div className='float-right' style={{ lineHeight: '2rem', fontWeight: 200 }}>
          <Form.Check inline 
            label='outdoors'
            type='checkbox' 
            id={`inline-radio-1`}
            checked={ this.state.isOutdoorsOnly }
            onChange={this.toggleOutdoors}
          />
          <Form.Check inline
            label='24/7'
            type='checkbox'
            id={`inline-radio-2`}
            checked={ this.state.isOpen24Hours } 
            onChange={this.toggle24Hours}
          />
        </div>
        <Table className='mb-0' variant='dark' hover size='sm' style={{ fontSize: '.85em' }}>
          <thead>
            <tr style={{ fontWeight: 600 }}>
              <th>Jurisdiction</th>
              <th>Address</th>
              <th>Info</th>
            </tr>
          </thead>
          <tbody style={{ fontWeight: 300 }}>
            {dropboxLocations.map((location, index) => this.renderRow(location, index))}
          </tbody>
        </Table>
        <small>
          <a href='https://www.michigan.gov/documents/sos/Ballot_Dropbox_Locations_697191_7.pdf' target='_blank' rel='noopener noreferrer'>
            <sup>*</sup>data sourced from www.michigan.gov
          </a>
        </small>
      </div>
    );
  }
}
