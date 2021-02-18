import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import { Comment } from './Comment';
import { InlineIcon } from '@iconify/react';
import mapMarkedAlt from '@iconify/icons-fa-solid/map-marked-alt';
import { DropboxLocation } from '../../store/dropbox/types';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../store/types';
import { geocodeDropbox } from '../../store/user/thunks';

const mapStateToProps = (state: RootState) => ({});

const connector = connect(mapStateToProps, { geocodeDropbox });

type PropsFromRedux = ConnectedProps<typeof connector>

interface Props extends PropsFromRedux {
  dropboxLocations: DropboxLocation[];
  isOutdoorsOnly: boolean;
  isOpen24Hours: boolean;
}

class DropboxLocationsTable extends Component<Props> {

  geocodeAddress = async (location: DropboxLocation): Promise<void> => {
    const address = `${location.address} ${location.city} ${location.state}`;
    this.props.geocodeDropbox(address);
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
            isOutdoors={isOutdoors ? isOutdoors : true}
            dropoffHours={dropoffHours ? dropoffHours : ''}
            comments={comments ? comments : ''}
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

export default connector(DropboxLocationsTable)