import React, { Component } from 'react';
import { DropboxLocation } from '../../data/types';
import Table from 'react-bootstrap/Table';
import { Destination } from '../types';
import { Comment } from './Comment';
import { InlineIcon } from '@iconify/react';
import mapMarkedAlt from '@iconify/icons-fa-solid/map-marked-alt';
import { LocationClient } from '../../data/LocationClient';

type DropboxLocationsTableProps = {
  dropboxLocations: DropboxLocation[];
  addDestination: (destination: Destination) => void;
  setSearching: (isSearching: boolean) => void;
  isOutdoorsOnly: boolean;
  isOpen24Hours: boolean;
}

export class DropboxLocationsTable extends Component<DropboxLocationsTableProps> {

  private locationClient: LocationClient;

  constructor(props: DropboxLocationsTableProps) {
    super(props);
    this.locationClient = new LocationClient();
  }

  geocodeAddress = async (location: DropboxLocation): Promise<void> => {
    const address = `${location.address} ${location.city} ${location.state}`;
    this.props.setSearching(true);
    const response = await this.locationClient.get(address);

    this.props.setSearching(false);
    if (response.location) {
      this.props.addDestination(response.location);
    } else {
      // TODO: display not found error
    }
  }

  renderRow = (location: DropboxLocation, index: number): JSX.Element => {
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

  canDisplayLocation = (location: DropboxLocation): boolean => {
    if (this.props.isOutdoorsOnly && !location.isOutdoors) {
      return false;
    }
    if (this.props.isOpen24Hours && location.dropoffHours !== '24/7') {
      return false;
    }
    return true;
  }

  render = (): JSX.Element => {
    return (
      <Table className='mb-0' variant='dark' hover size='sm'>
        <thead>
          <tr style={{ fontWeight: 300 }}>
            <th>Jurisdiction</th>
            <th>Address <InlineIcon className='ml-1' icon={mapMarkedAlt} /></th>
            <th>Info</th>
          </tr>
        </thead>
        <tbody style={{ fontWeight: 100 }}>
          {
            this.props.dropboxLocations
              .filter((location) => this.canDisplayLocation(location))
              .map((location, index) => this.renderRow(location, index))
          }
        </tbody>
      </Table>
    );
  }
}
