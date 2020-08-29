import React, { Component } from 'react';
import { DropboxLocation } from '../../data/types';
import Table from 'react-bootstrap/Table';
import { Destination } from '../types';
import { Comment } from './Comment';
import { InlineIcon } from '@iconify/react';
import mapMarkedAlt from '@iconify/icons-fa-solid/map-marked-alt';

type DropboxLocationsTableProps = {
  dropboxLocations: DropboxLocation[];
  addDestination: (destination: Destination) => void;
  isSearching: (isSearching: boolean) => void;
}

export class DropboxLocationsTable extends Component<DropboxLocationsTableProps> {

  // TODO: make geocoder class to DRY up code
  geocodeAddress = (location: DropboxLocation) => {
    const geocoder = new google.maps.Geocoder();
    const address = `${location.address} ${location.city} MI`;
    this.props.isSearching(true);
    geocoder.geocode({ address }, this.handleGeocodeResults);
  }

  handleGeocodeResults = (results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus) => {
    console.log('results', results);
    this.props.isSearching(false);
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
      <tr key={index} style={{ cursor: 'pointer' }} title='click to add marker' onClick={() => this.geocodeAddress(location)}>
        <td>{ jurisdiction }</td>
        <td>{ address }</td>
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

  render() {
    return (
      <Table className='mb-0' variant='dark' hover size='sm' style={{ fontSize: '.85em' }}>
        <thead>
          <tr style={{ fontWeight: 600 }}>
            <th>Jurisdiction<sup>*</sup></th>
            <th>Address <InlineIcon className='ml-1' icon={mapMarkedAlt} /></th>
            <th>Info</th>
          </tr>
        </thead>
        <tbody style={{ fontWeight: 300 }}>
          { this.props.dropboxLocations.map((location, index) => this.renderRow(location, index)) }
        </tbody>
      </Table>
    );
  }
}
