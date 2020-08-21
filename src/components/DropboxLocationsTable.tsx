import React, { Component } from 'react';
import { DropboxLocation } from '../data/types';
import Table from 'react-bootstrap/Table';

type DropboxLocationsTableProps = {
  dropboxLocations: DropboxLocation[];
}

export class DropboxLocationsTable extends Component<DropboxLocationsTableProps> {

  renderRow = (location: DropboxLocation, index: number) => {
    return (
      <tr key={index}>
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
          <tr>
            <th>Jurisdiction</th>
            <th>Address</th>
            <th>City</th>
            <th>Outdoors?</th>
            <th>Dropoff hours</th>
            <th>Comments</th>
          </tr>
        </thead>
        <tbody>
          { dropboxLocations.map((location, index) => this.renderRow(location, index)) }
        </tbody>
      </Table>
    );
  }
}
