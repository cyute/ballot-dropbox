import React, { Component } from 'react';
import { DropboxLocation } from '../data/types';
import Table from 'react-bootstrap/Table';

type DropboxLocationsTableProps = {
  dropboxLocations: DropboxLocation[];
  addLocation: any; // TODO: fix type
}

export class DropboxLocationsTable extends Component<DropboxLocationsTableProps> {

  // TODO: make geocoder class to DRY up code
  geocodeAddress = (location: DropboxLocation) => {
    const geocoder = new google.maps.Geocoder();
    const address = `${location.address} ${location.city} MI`;
    geocoder.geocode({ address }, this.handleGeocodeResults);
  }

  handleGeocodeResults = (results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus) => {
    console.log('results', results);
    const city = results[0].address_components.find(component => component.types.includes('locality'))?.long_name;
    const location = results[0].geometry.location;
    const dropboxLocation = {
      lat: location.lat(),
      lng: location.lng(),
      city,
    };
    this.props.addLocation(dropboxLocation);
  }

  renderRow = (location: DropboxLocation, index: number) => {
    return (
      <tr key={index} onClick={(event) => this.geocodeAddress(location)}>
        <td>{ location.jurisdiction }</td>
        <td>{ location.address }</td>
        <td>{ location.city } </td>
        <td>{ location.isOutdoors ? 'Outdoors' : 'Indoors' }</td>
        <td>{ location.dropoffHours }</td>
        <td>{ location.comments }</td>
      </tr>
    )
  }

  render() {
    const { dropboxLocations } = this.props;
    if (dropboxLocations.length === 0) {
      return React.Fragment;
    }
    return (
      <Table hover size='sm' style={{ fontSize: '.85em' }}>
        <thead>
          <tr style={{fontWeight: 600}}>
            <th>Jurisdiction</th>
            <th>Address</th>
            <th>City</th>
            <th>Outdoors?</th>
            <th>Dropoff hours</th>
            <th>Comments</th>
          </tr>
        </thead>
        <tbody style={{fontWeight: 300}}>
          { dropboxLocations.map((location, index) => this.renderRow(location, index)) }
        </tbody>
      </Table>
    );
  }
}
