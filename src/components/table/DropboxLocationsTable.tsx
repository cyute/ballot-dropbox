import React from 'react';
import Table from 'react-bootstrap/Table';
import { Comment } from './Comment';
import { InlineIcon } from '@iconify/react';
import mapMarkedAlt from '@iconify/icons-fa-solid/map-marked-alt';
import { DropboxLocation } from '../../store/dropbox/types';
import { useDispatch } from 'react-redux';
import { geocodeDropbox } from '../../store/user/slice';

type Props = {
  dropboxLocations: DropboxLocation[];
  isOutdoorsOnly: boolean;
  isOpen24Hours: boolean;
}

export const DropboxLocationsTable = ({ dropboxLocations, isOutdoorsOnly, isOpen24Hours }: Props): JSX.Element => {

  const dispatch = useDispatch();

  const geocodeAddress = async (location: DropboxLocation): Promise<void> => {
    const address = `${location.address} ${location.city} ${location.state}`;
    dispatch(geocodeDropbox(address));
  }

  type RowProps = {
    location: DropboxLocation;
  }

  const Row = ({ location }: RowProps): JSX.Element => {
    const { address, comments, jurisdiction, isOutdoors, dropoffHours } = location;
    return (
      <tr style={{ cursor: 'pointer' }} title='click to add marker' onClick={() => geocodeAddress(location)}>
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

  const canDisplayLocation = (location: DropboxLocation): boolean => {
    if (isOutdoorsOnly && !location.isOutdoors) {
      return false;
    }
    if (isOpen24Hours && location.dropoffHours !== '24/7') {
      return false;
    }
    return true;
  }

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
          dropboxLocations
            .filter((location) => canDisplayLocation(location))
            .map((location, index) => <Row key={index} location={location} />)
        }
      </tbody>
    </Table>
  );
}
